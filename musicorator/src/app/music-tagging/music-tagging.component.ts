import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ElectronCommunicatorService } from '../electron-communicator.service';
import { HelperService } from '../helper.service';
import { PopupService } from '../popup/popup.service';
import { SuggestionService } from './suggestion.service';

export enum KEY_CODE {
  ENTER = 'Enter',
}
@Component({
  selector: 'app-music-tagging',
  templateUrl: './music-tagging.component.html',
  styleUrls: ['./music-tagging.component.css'],
})
export class MusicTaggingComponent implements OnInit, OnDestroy, OnChanges {
  // feedback
  isLoading;
  progress;
  feedbackCounter;
  currentFeedback;

  // other
  subscriptions;

  @Input() currentFile;
  @Input() currentMetadataObject;
  isSort;
  tagsArray;
  tagsSuggestion;
  currentSuggestions;
  suggestionKeys = [
    'album',
    'artist',
    'bpm',
    'composer',
    'initialKey',
    'title',
  ];

  isSaveOnEnter = true;
  isAddOnClick = false;
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    if (event.key === KEY_CODE.ENTER) {
      if (this.isSaveOnEnter) {
        this.saveSongData();
      }
    }
  }

  constructor(
    private communicator: ElectronCommunicatorService,
    private suggestionService: SuggestionService,
    private helper: HelperService,
    private dialog: PopupService
  ) {}

  ngOnInit(): void {
    // this.loadSettings();
    this.subscriptions = [];
    this.subscriptions.push(this.setPlaySongListener());
    this.subscriptions.push(this.setSaveSongListener());
    // this.subscriptions.push(this.setGetSettingsListener());
    // this.subscriptions.push(this.setSuggestionsListener());
    this.tagsSuggestion = this.suggestionService.getSuggestionTags();
    this.setProgressAndFeedback(false, '', false);
    this.setSongDetails(this.currentMetadataObject);
  }

  ngOnChanges(): void {
    this.tagsSuggestion = this.suggestionService.getSuggestionTags();

    this.setProgressAndFeedback(false, '', false);
    this.setSongDetails(this.currentMetadataObject);
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  loadSettings(): void {
    const options = {
      key: 'getSettings',
    };
    this.setProgressAndFeedback(true, 'Getting Settings...', false);
    this.communicator.sendToElectron(options);
  }

  playSong(): void {
    const options = {
      key: 'playAudio',
      dir: this.currentFile,
    };
    this.setProgressAndFeedback(true, 'Playing Audio...', false);
    this.communicator.sendToElectron(options);
  }

  saveSongData(): void {
    const tags = this.getTagsFormatted();
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

  setPlaySongListener(): Subscription {
    return this.communicator
      .listenToElectronConstantly('playAudio')
      .subscribe((result) => {
        this.setProgressAndFeedback(false, 'Played Audio.', false);
      });
  }

  setGetSettingsListener(): Subscription {
    return this.communicator
      .listenToElectronConstantly('getSettings')
      .subscribe((result) => {
        this.setProgressAndFeedback(false, 'Got Settings.', false);
      });
  }

  // setSuggestionsListener(): Subscription {
  //   return this.chips.getSuggestionsObservable().subscribe((result) => {
  //     this.tagsSuggestion = this.suggestionService.setSuggestionTags(result);
  //   });
  // }

  setSaveSongListener(): Subscription {
    return this.communicator
      .listenToElectronConstantly('setMusicData')
      .subscribe((result) => {
        this.setProgressAndFeedback(false, 'Saved Audio.', true);
      });
  }

  getFileName(): string {
    return this.communicator.getFileName(this.currentFile);
  }

  showMore(): void {
    if (this.currentMetadataObject) {
      this.openDialog('Full Code', '', this.currentMetadataObject);
    } else {
      this.feedback('Could not get music data.', true);
    }
  }

  openDialog(titleIn, message, codeIn): void {
    const dialogMessage = {
      title: 'Music Data',
      list: [{ title: titleIn, content: message }],
      code: codeIn,
    };
    this.dialog.openDialog(dialogMessage).then((reply) => {});
  }

  setSongDetails(result): void {
    if (result) {
      this.setSuggestionsFromTrack(result);
      this.setTagsArray(result);
    } else {
      this.feedback('No Audio Metadata.', false);
    }
  }

  setSuggestionsFromTrack(result): void {
    const arr = this.helper.getValuesFromKeys(result, this.suggestionKeys);
    const uniques = this.helper.getOnlyUnique(arr);
    const trimmed = this.helper.getTrimmedArray(uniques);
    const lowered = this.helper.getLowerCaseArray(trimmed);

    this.currentSuggestions = this.tagsSuggestion.concat(lowered);
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
    this.tagsArray = tags;
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

  getTagsFormatted(): any {
    if (this.tagsArray) {
      if (this.tagsArray.length) {
        const trimedArr = this.tagsArray.map((str) => str.trim().toLowerCase());
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

  feedback(s: any, isImportant: boolean): void {
    if (isImportant && s) {
      this.helper.feedback(JSON.stringify(s));
    }
    this.currentFeedback = s;
  }
}
