import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { CommunicatorElectronService } from '../communicator-electron.service';
import { DataProcessorService } from '../data-processor.service';
import { FileDataService } from '../file-data.service';
import { ValidRequest } from '../ValidRequest';

@Component({
  selector: 'app-file-menu',
  templateUrl: './file-menu.component.html',
  styleUrls: ['./file-menu.component.css'],
})
export class FileMenuComponent implements OnInit, OnDestroy {
  electronSubscriptions;

  // get file customizations
  isGetAllData = true;
  currentFileType = '.mp3';
  feedbackMessage = '';

  // files
  currentFolder;
  currentFiles;
  currentSuggestions;
  currentSuggestionMatrix;
  currentNewFolder;
  filteredMatrix;

  filteredFiles;

  // progress
  maxProgress = 100;

  constructor(
    private electronCommunicator: CommunicatorElectronService,
    private assistant: DataProcessorService,
    private fs: FileDataService
  ) {}

  ngOnInit(): void {
    this.electronSubscriptions = [];
    this.electronSubscriptions.push(this.setElectronListener());
    this.electronSubscriptions.push(this.setFeedbackListener());
    this.electronSubscriptions.push(this.setFilteredFilesListener());
    this.electronSubscriptions.push(this.setNewFolderListener());
    this.assistant.loadSettings(this.getFeedback());
  }

  ngOnDestroy(): void {
    this.assistant.setUnsubscribeTidy(this.electronSubscriptions);
  }

  setFeedbackListener(): Subscription {
    return this.assistant.getFeedbackSubscription().subscribe((r) => {
      this.feedbackMessage = r;
    });
  }

  setFilteredFilesListener(): Subscription {
    return this.fs.getFilteredFilesObservable().subscribe((r) => {
      this.filteredFiles = r;
      console.log('FILTERED files');
      console.log(this.filteredFiles);
    });
  }

  setNewFolderListener(): Subscription {
    return this.fs.getNewFolderObservable().subscribe((r) => {
      this.currentNewFolder = r;
      console.log('received new folder name ' + r);
    });
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
    console.log('move to: ' + this.currentNewFolder);
    console.log(this.filteredFiles);
    if (this.filteredFiles.length > 0) {
      this.copyDirectory(
        this.currentFolder,
        this.currentNewFolder,
        this.filteredFiles
      );
    }
  }

  moveToFolder(): void {
    // this.currentNewFolder;
  }

  showCsv(): void {
    // this.filteredMatrix
  }

  getFeedback(): (s: string) => void {
    return (msg) => {
      this.feedback(msg);
    };
  }

  feedback(msg: any): void {
    console.log(msg);
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
          // this.setProgressAndFeedback(false, 'Got Settings.', false);
        } else {
          // this.setProgressAndFeedback(false, 'Get Settings Failed.', false);
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
        this.currentSuggestions = this.assistant.getSuggestionsAsObject(
          response.tags
        );
        this.currentSuggestionMatrix = this.assistant.getSuggestionsAsMatrix(
          response.tags
        );
        this.fs.setSuggestionsObject(this.currentSuggestions);
        this.fs.setSuggestionsMatrix(this.currentSuggestionMatrix);
      }
    }
  }

  handleOpenFolderResponse(response: any): void {
    if (response) {
      this.resetVariables();
      this.fs.setCurrentFolder(response);
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
        this.currentSuggestions
      );
      this.fs.setCurrentAudioData(response);
      this.fs.setCurrentAudioDataMatrix(result);
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
