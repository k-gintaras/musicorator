import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { Subscription } from 'rxjs';
import { ElectronCommunicatorService } from '../electron-communicator.service';
import { HelperService } from '../helper.service';

export enum KEY_CODE {
  RIGHT_ARROW = 'ArrowRight',
  LEFT_ARROW = 'ArrowLeft',
  ENTER = 'Enter',
}

// import { COMMA, SPACE } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-tagging-from-file',
  templateUrl: './tagging-from-file.component.html',
  styleUrls: ['./tagging-from-file.component.css'],
})
export class TaggingFromFileComponent implements OnInit, OnDestroy {
  // readonly separatorKeysCodes: number[] = [SPACE, COMMA];

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
  isAutoplay = true;

  suggestionsFromFile;
  suggestionsAsArray;
  suggestionsAsMatrix;
  resultsArray = [];
  isAutoSort = true;
  isSaveOnEnter = true;

  songSuggestions = [];
  custom = [];
  filesAndTags = {};
  selectedGroups = [];

  suggestionKeys = [
    'album',
    'artist',
    'bpm',
    'composer',
    'initialKey',
    'title',
  ];

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    if (event.key === KEY_CODE.RIGHT_ARROW) {
      this.loadNextTrack();
    }

    if (event.key === KEY_CODE.LEFT_ARROW) {
      this.loadPreviousTrack();
    }
    if (event.key === KEY_CODE.ENTER) {
      if (this.isSaveOnEnter) {
        this.saveSongData();
      }
    }
  }

  getFileData(file: string): string[] {
    const name = this.getFileName(file);
    if (this.filesAndTags) {
      if (this.filesAndTags[name]) {
        return this.filesAndTags[name];
      }
    }
    return [];
  }

  saveSongData(): void {
    const tags = this.getTagsFormatted();
    this.filesAndTags[
      this.getFileName(this.currentFile)
    ] = this.resultsArray.slice();
    const options = {
      key: 'setMusicData',
      dir: this.currentFile,
      tagsObject: tags,
    };
    if (this.currentFile && tags) {
      this.setProgressAndFeedback(true, 'Saving Audio Data...', true);
      this.communicator.sendToElectron(options);
    } else {
      this.feedback('Not saving empty.', true);
    }
  }

  getTagsFormatted(): any {
    if (this.resultsArray) {
      if (this.resultsArray.length) {
        const trimedArr = this.resultsArray.map((str) =>
          str.trim().toLowerCase()
        );
        const tagString = trimedArr.join(',');

        const updatedComment = {
          language: 'eng',
          shortText: '',
          text: tagString,
        };

        // library requires top object // I didn't realize and ruined some files :D
        // update just edits tags added, write overwrites and deletes the rest
        const tags = {
          COMM: updatedComment,
          comment: updatedComment,
        };
        return tags;
      }
    }
    return '';
  }

  addCustom(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    this.tryAddValidated(value, this.custom);
    if (input) {
      input.value = '';
    }
  }

  constructor(
    private communicator: ElectronCommunicatorService,
    private helper: HelperService
  ) {}

  ngOnInit(): void {
    this.loadSettings();
    this.setProgressAndFeedback(false, '', false);
    this.subscriptions = [];
    this.subscriptions.push(this.setLoadFolderListener());
    this.subscriptions.push(this.setGetFilesByTypeListener());
    this.subscriptions.push(this.setPlaySongListener());
    this.subscriptions.push(this.setGetSongListener());
    this.subscriptions.push(this.setGetSettingsListener());
    this.subscriptions.push(this.setSaveSongListener());
  }

  setSaveSongListener(): Subscription {
    return this.communicator
      .listenToElectronConstantly('setMusicData')
      .subscribe((result) => {
        this.setProgressAndFeedback(false, 'Saved Audio.', true);
      });
  }

  loadSettings(): void {
    const options = {
      key: 'getSettings',
    };
    this.setProgressAndFeedback(true, 'Getting Settings...', false);
    this.communicator.sendToElectron(options);
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      if (subscription) {
        try {
          subscription.unsubscribe();
        } catch (error) {}
      }
    }
  }

  getSuggestionsAsArray(): any[] {
    const keys = Object.keys(this.suggestionsFromFile);
    const arr = new Array<any>(keys.length);

    Object.keys(this.suggestionsFromFile).forEach((key) => {
      const val = this.suggestionsFromFile[key];
      arr[val.i] = { name: key, color: val.color, group: val.group };
    });

    return arr;
  }

  getSuggestionsAsMatrix(): any[] {
    const keys = Object.keys(this.suggestionsFromFile);
    const arr = new Array<any>(keys.length);

    Object.keys(this.suggestionsFromFile).forEach((key) => {
      const val = this.suggestionsFromFile[key];
      arr[val.i] = { name: key, color: val.color, group: val.group };
    });

    let currentGroup = arr[0].group;
    const matrix = [];
    let currentRow = [];
    for (const suggestionObj of arr) {
      const group = suggestionObj.group;
      if (currentGroup !== group) {
        matrix.push({ title: currentGroup, value: currentRow });

        currentGroup = group;
        currentRow = [];
      }
      currentRow.push(suggestionObj);
    }
    // last push
    matrix.push({ title: currentGroup, value: currentRow });

    return matrix;
  }

  setSongDetails(result): void {
    if (result) {
      this.setSuggestionsFromTrack(result);
      this.setTagsArray(result);
      this.filesAndTags[
        this.getFileName(this.currentFile)
      ] = this.resultsArray.slice();
    } else {
      this.feedback('No Audio Metadata.', false);
    }
  }

  setSuggestionsFromTrack(result): void {
    const arr = this.helper.getValuesFromKeys(result, this.suggestionKeys);
    const uniques = this.helper.getOnlyUnique(arr);
    const trimmed = this.helper.getTrimmedArray(uniques);
    const lowered = this.helper.getLowerCaseArray(trimmed);

    this.songSuggestions = lowered;
  }

  setTagsArray(result: any): void {
    let tags = [];
    if (result.comment) {
      let tagsResult = '';
      const comment = result.comment;
      if (comment.text) {
        tagsResult = comment.text;
        tags = this.getCommentAsArray(tagsResult);
      }
    }
    this.resultsArray = tags;
    this.selectedGroups = [];
  }

  getColor(tag): string {
    if (this.suggestionsFromFile) {
      if (this.suggestionsFromFile[tag]) {
        return this.suggestionsFromFile[tag].color;
      }
    }
    return 'grey';
  }

  getCommentAsArray(comment: string): string[] {
    if (comment) {
      const c = comment.toString();
      let arr = c.split(',');
      if (arr) {
        arr = this.helper.getLowerCaseArray(arr);
        return this.helper.getTrimmedArray(arr);
      }
    }
    return [''];
  }

  remove(tag: string): void {
    const index = this.resultsArray.indexOf(tag);

    if (index >= 0) {
      this.resultsArray.splice(index, 1);
    }
  }

  removeCustom(tag: string): void {
    const index = this.custom.indexOf(tag);

    if (index >= 0) {
      this.custom.splice(index, 1);
    }
  }

  tryAddValidated(value, arr): void {
    const unique = this.isNotIn(value, arr);

    if (unique) {
      if ((value || '').trim()) {
        arr.push(value.trim().toLowerCase());
      }
    } else {
      this.feedback('Already added.', true);
    }

    if (this.isAutoSort) {
      this.sortArrayByLength(this.resultsArray);
    }
  }

  sortArrayByLength(arr: string[]): void {
    arr.sort((a, b) => {
      // ASC  -> a.length - b.length
      // DESC -> b.length - a.length
      return a.length - b.length;
    });
  }

  // only add if unique
  isNotIn(val: string, arr: string[]): boolean {
    return !(arr.indexOf(val) > -1);
  }

  isThisTagSelected(tag: string): boolean {
    return !this.isNotIn(tag, this.resultsArray);
  }

  setGetSettingsListener(): Subscription {
    return this.communicator
      .listenToElectronConstantly('getSettings')
      .subscribe((result) => {
        if (result) {
          this.suggestionsFromFile = result.tags;
          this.suggestionsAsArray = this.getSuggestionsAsArray();
          this.suggestionsAsMatrix = this.getSuggestionsAsMatrix();
          this.setProgressAndFeedback(false, 'Got Settings.', false);
        } else {
          this.setProgressAndFeedback(false, 'Get Settings Failed.', false);
        }
      });
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

    const i = this.folders.indexOf(this.currentFile);
    if (i > -1) {
      this.currentFilePositionInArray = i;
    }

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
        if (result) {
          this.currentFolder = result;
          this.setProgressAndFeedback(false, 'Opened Directory.', true);
          setTimeout(() => {
            this.filesAndTags = {};
            this.getFilesByType();
          }, 500);
        } else {
          this.setProgressAndFeedback(false, 'Open Folder Failed.', false);
        }
      });
  }

  setGetFilesByTypeListener(): Subscription {
    return this.communicator
      .listenToElectronConstantly('getFilesByType')
      .subscribe((result) => {
        if (result) {
          this.folders = result;
          this.setProgressAndFeedback(false, 'Received Files.', true);
        } else {
          this.setProgressAndFeedback(false, 'Get Files Failed.', false);
        }
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
        if (result) {
          this.currentMetaDataObject = result;
          this.setProgressAndFeedback(false, 'Received Audio Data.', false);
          this.setSongDetails(result);
        } else {
          this.setProgressAndFeedback(false, 'Get Data Failed.', false);
        }
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
