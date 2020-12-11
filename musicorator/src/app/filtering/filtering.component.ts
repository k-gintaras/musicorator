import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommunicatorElectronService } from '../communicator-electron.service';
import { DataProcessorService } from '../data-processor.service';
import { HelperService } from '../helper.service';
import { PopupService } from '../popup/popup.service';
import { TestDataService } from '../test-data.service';
import { ValidRequest } from '../ValidRequest';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.css'],
})
export class FilteringComponent implements OnInit, OnDestroy {
  electronSubscriptions;

  // get file customizations
  isGetAllData = true;
  currentFileType = '.mp3';
  feedbackMessage = '';

  // files
  currentFolder = '';
  currentFiles = [];
  suggestionsJson;
  suggestionObject;
  suggestionMatrix;
  currentNewFolder;

  // audio matrix
  matrixTitles = [];
  matrix = [];
  filteredMatrix = [];
  matrixForCsv = [];

  filteredFiles = [];

  // progress
  maxProgress = 100;

  constructor(
    private electronCommunicator: CommunicatorElectronService,
    private assistant: DataProcessorService,
    private helper: HelperService,
    private dialog: PopupService,
    private test: TestDataService
  ) {}

  // TODO: on matrix filter, let matrix reset, because otherwise matrix just gets reduced to nothing
  // button reset matrix ?

  ngOnInit(): void {
    this.electronSubscriptions = [];
    this.electronSubscriptions.push(this.setElectronListener());
    this.electronSubscriptions.push(this.setFeedbackListener());
    this.assistant.loadSettings(this.getFeedback());

    // this.loadTestMatrix();
  }

  // loadTestMatrix() {
  //   const data = this.test.testData2;

  //   const result = this.assistant.getMetadataMatrix(
  //     data,
  //     this.suggestionObject
  //   );

  //   this.matrixTitles = result[0];
  //   this.matrix = result[1];
  //   this.filteredMatrix = result[1];
  //   // console.log(response);

  //   this.feedback('Got All Music From Directory.');
  //   this.maxProgress = 0;
  // }

  ngOnDestroy(): void {
    this.assistant.setUnsubscribeTidyWithElectron(this.electronSubscriptions);
  }

  setFeedbackListener(): Subscription {
    return this.assistant.getFeedbackSubscription().subscribe((r) => {
      this.feedbackMessage = r;
    });
  }

  onFolderUpdate(name): void {
    this.currentNewFolder = name;
  }

  onMatrixUpdate(matrix): void {
    this.matrixForCsv = matrix;
  }

  onFilesUpdate(files): void {
    this.filteredFiles = files;
  }

  openFolder(): void {
    this.assistant.openFolder(this.getFeedback());
  }

  loadSettings(): void {
    this.assistant.loadSettings(this.getFeedback());
  }

  loadMusicFiles(folders: string[]): void {
    this.assistant.loadAllMusicFiles(folders, this.getFeedback());
  }

  makeDirectory(where: string, name: string): void {
    this.assistant.makeDir(where, name, this.getFeedback());
  }

  copyDirectory(folderIn: string, nameIn: string, foldersIn: string[]): void {
    this.assistant.copyDirectory(
      folderIn,
      nameIn,
      foldersIn,
      this.getFeedback()
    );
  }

  playSong(file): void {
    this.assistant.playSong(file, this.getFeedback());
  }

  getFilesByType(file, fileContains): void {
    this.assistant.getFilesByType(file, fileContains, this.getFeedback());
  }

  getSongData(file): void {
    this.assistant.getSongData(file, this.getFeedback());
  }

  saveSongData(file, tags): void {
    this.assistant.saveSongData(file, tags, this.getFeedback());
  }

  copyToFolder(): void {
    if (this.filteredFiles.length > 0) {
      this.copyDirectory(
        this.currentFolder,
        this.currentNewFolder,
        this.filteredFiles
      );
    }
  }

  moveToFolder(): void {
    // TODO: copy folder version, move folder, is it really needed?
  }

  showCsv(): void {
    const csvMatrix = [this.matrixTitles].concat(this.matrixForCsv);
    const csv = this.helper.getCsvFromMatrix(csvMatrix);
    this.showPopup('CSV', '', csv);
  }

  showPopup(titleIn, message, codeIn): void {
    const dialogMessage = {
      title: titleIn,
      list: [{ title: titleIn, content: message }],
      code: codeIn,
    };
    this.dialog.openDialog(dialogMessage).then((reply) => {});
  }

  getFeedback(): (s: string) => void {
    return (msg) => {
      this.feedback(msg);
    };
  }

  feedback(msg: any): void {
    this.feedbackMessage = JSON.stringify(msg);
  }

  /**
   * responseFromMain
   * {key: string, response: any}
   */
  setElectronListener(): Subscription {
    return this.electronCommunicator
      .listenToElectronResponsibly('responseFromMain')
      .subscribe((result) => {
        if (result) {
          this.handleResponse(result);
        } else {
        }
      });
  }

  handleResponse(result): void {
    const key = result.key;
    const response = result.response;

    if (key) {
      switch (key) {
        case ValidRequest.openDirectory:
          this.handleOpenFolderResponse(response);
          break;
        case ValidRequest.getSettings:
          this.handleSettingsResponse(response);
          break;
        case ValidRequest.getAllMusicData:
          this.handleGetMusicDataResponse(response);
          break;
        case ValidRequest.getFilesByType:
          if (this.isGetAllData) {
            this.handleGetFilesResponseAll(response);
          } else {
            this.handleGetFilesResponse(response);
          }
          break;
        case ValidRequest.getFeedback:
          this.assistant.setFeedback(true, response);
          break;
        default:
          break;
      }
    }
  }

  handleSettingsResponse(response: any): void {
    if (response) {
      if (response.tags) {
        this.suggestionsJson = response.tags;
        this.suggestionObject = this.assistant.getSuggestionsAsObject(
          response.tags
        );
        this.suggestionMatrix = this.assistant.getSuggestionsAsMatrix(
          response.tags
        );
      }
    }
  }

  handleOpenFolderResponse(response: any): void {
    if (response) {
      this.resetVariables();
      this.currentFolder = response;
      this.feedback('Opened Directory.');
      // dont load instantly
      setTimeout(() => {
        this.getFilesByType(this.currentFolder, this.currentFileType);
      }, 500);
    }
  }

  handleGetMusicDataResponse(response: any): void {
    if (response) {
      const result = this.assistant.getMetadataMatrix(
        response,
        this.suggestionObject
      );

      this.matrixTitles = result[0];
      this.matrix = result[1];
      this.filteredMatrix = result[1];

      this.feedback('Got All Music From Directory.');
      this.maxProgress = 0;
    }
  }

  handleGetFilesResponse(response: any): void {
    if (response) {
      this.currentFiles = response;
      this.feedback('Got Files From Directory.');
    }
  }

  handleGetFilesResponseAll(response: any): void {
    if (response) {
      this.currentFiles = response;
      this.assistant.setMaxForFeedback(this.currentFiles.length);
      this.maxProgress = this.currentFiles.length;

      this.feedback('Got Files From Directory.');
      // dont load instantly
      setTimeout(() => {
        this.loadMusicFiles(this.currentFiles);
      }, 500);
    }
  }

  resetVariables(): void {
    this.currentFolder = '';
    this.currentFiles = [];
  }
}
