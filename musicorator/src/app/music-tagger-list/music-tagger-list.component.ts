import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ElectronCommunicatorService } from '../electron-communicator.service';
import { HelperService } from '../helper.service';

export enum KEY_CODE {
  RIGHT_ARROW = 'ArrowRight',
  LEFT_ARROW = 'ArrowLeft',
  ENTER = 'ENTER',
}

@Component({
  selector: 'app-music-tagger-list',
  templateUrl: './music-tagger-list.component.html',
  styleUrls: ['./music-tagger-list.component.css'],
})
export class MusicTaggerListComponent implements OnInit, OnDestroy {
  // feedback
  isLoading;
  progress;
  feedbackCounter;
  currentFeedback;

  // other
  subscriptions;

  currentFile;
  currentMetaDataObject;
  isPlayAndData = true;

  currentFolder = 'C:/Users';
  @Input() fileContains = '.mp3';
  folders: string[] = [];

  // allow next song
  currentFilePositionInArray = 0;
  isAutoplay = false;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    if (event.key === KEY_CODE.RIGHT_ARROW) {
      this.loadNextTrack();
    }

    if (event.key === KEY_CODE.LEFT_ARROW) {
      this.loadPreviousTrack();
    }
  }

  constructor(
    private communicator: ElectronCommunicatorService,
    private helper: HelperService
  ) {}

  ngOnInit(): void {
    this.setProgressAndFeedback(false, '', false);
    this.subscriptions = [];
    this.subscriptions.push(this.setLoadFolderListener());
    this.subscriptions.push(this.setGetFilesByTypeListener());
    this.subscriptions.push(this.setPlaySongListener());
    this.subscriptions.push(this.setGetSongListener());
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  loadPreviousTrack(): void {
    this.setNextOrPreviousTrack(-1);
  }

  loadNextTrack(): void {
    this.setNextOrPreviousTrack(1);
  }

  setNextOrPreviousTrack(next: number): void {
    this.setValidatedPosition(next);
    const file = this.folders[this.currentFilePositionInArray];
    this.setCurrentFile(file);
  }

  setValidatedPosition(next: number): void {
    this.currentFilePositionInArray += next;

    if (this.currentFilePositionInArray < 0) {
      this.currentFilePositionInArray = this.folders.length - 1;
    }
    if (this.currentFilePositionInArray > this.folders.length - 1) {
      this.currentFilePositionInArray = 0;
    }
  }

  setCurrentFile(file): void {
    this.currentFile = file;
    this.getSongData();
    if (this.isAutoplay) {
      this.playSong(file);
    }
  }

  playSong(file): void {
    this.currentFile = file;
    const options = {
      key: 'playAudio',
      dir: file,
    };
    this.setProgressAndFeedback(true, 'Playing Audio...', false);
    this.communicator.sendToElectron(options);

    if (this.isPlayAndData) {
      this.getSongData();
    }
  }

  openFolder(): void {
    const options = {
      key: 'openDirectory',
    };
    this.setProgressAndFeedback(true, 'Opening Directory...', true);
    this.communicator.sendToElectron(options);
  }

  getFilesByType(): void {
    const options = {
      key: 'getFilesByType',
      dir: this.currentFolder,
      type: this.fileContains,
    };
    this.setProgressAndFeedback(true, 'Getting Files...', true);
    this.communicator.sendToElectron(options);
  }

  getSongData(): void {
    const options = {
      key: 'getMusicData',
      dir: this.currentFile,
    };
    this.setProgressAndFeedback(true, 'Getting Audio Data...', false);
    this.communicator.sendToElectron(options);
  }

  setLoadFolderListener(): Subscription {
    return this.communicator
      .listenToElectronConstantly('openDirectory')
      .subscribe((result) => {
        this.currentFolder = result;
        this.setProgressAndFeedback(false, 'Opened Directory.', true);
        setTimeout(() => {
          this.getFilesByType();
        }, 500);
      });
  }

  setGetFilesByTypeListener(): Subscription {
    return this.communicator
      .listenToElectronConstantly('getFilesByType')
      .subscribe((result) => {
        this.folders = result;
        this.setProgressAndFeedback(false, 'Received Files.', true);
      });
  }

  setPlaySongListener(): Subscription {
    return this.communicator
      .listenToElectronConstantly('playAudio')
      .subscribe((result) => {
        this.setProgressAndFeedback(false, 'Played Audio.', false);
      });
  }

  setGetSongListener(): Subscription {
    return this.communicator
      .listenToElectronConstantly('getMusicData')
      .subscribe((result) => {
        this.currentMetaDataObject = result;
        this.setProgressAndFeedback(false, 'Received Audio Data.', false);
      });
  }

  getFileName(name: string): string {
    return this.communicator.getFileName(name);
  }

  setProgressAndFeedback(b: boolean, s: any, isImportant: boolean): void {
    this.isLoading = b;
    if (!b) {
      this.progress = 100;
    }
    if (b) {
      this.progress = 0;
      this.feedbackCounter = 0;
    }
    if (s) {
      this.feedback(s, isImportant);
    }
  }

  getFeedBack(): string {
    return this.currentFeedback;
  }

  feedback(s: any, isImportant: boolean): void {
    if (isImportant) {
      this.helper.feedback(JSON.stringify(s));
    }
    this.currentFeedback = JSON.stringify(s);
  }
}
