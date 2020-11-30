import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ElectronCommunicatorService } from './electron-communicator.service';
import { HelperService } from './helper.service';
import { PopupService } from './popup/popup.service';
export interface MusicSortable {
  dir: string;
  simple: {
    title: string;
    artist: string;
    album: string;
    composer: string;
    genre: string;
    year: string;
    bpm: number;
    initialKey: string;
    tags: string;
  };
  tags: string[];
  metadata: any;
}

@Injectable({
  providedIn: 'root',
})
export class DataProcessorService {
  // feedback
  isLoading = false;
  progress = 100;
  feedbackCounter = 0;
  maxFeedbackLimit = 0;
  private feedbackSubject = new BehaviorSubject<string>('');
  private feedbackObservable: Observable<string> = this.feedbackSubject.asObservable();
  private progressSubject = new BehaviorSubject<number>(0);
  private progressObservable: Observable<number> = this.progressSubject.asObservable();
  // in case there is need to send some messages
  private commonMessageSubject = new BehaviorSubject<string>('');
  private commonMessageObservable: Observable<string> = this.commonMessageSubject.asObservable();

  // audio metadata
  metadataKeys = ['title', 'album', 'artist', 'composer', 'bpm', 'initialKey'];
  // filter
  searchStringsArray = [
    { column: 'title', search: '' },
    { column: 'artist', search: '' },
    { column: 'album', search: '' },
    { column: 'composer', search: '' },
    { column: 'genre', search: '' },
    { column: 'year', search: '' },
    { column: 'bpm', search: '' },
    { column: 'initialKey', search: '' },
    { column: 'tags', search: '' },
  ];

  constructor(
    private dialog: PopupService,
    private helper: HelperService,
    private communicator: ElectronCommunicatorService
  ) {}

  getSortableObjects(result: any): any[] {
    const sortableObjects = [];
    for (const electronObject of result) {
      const o = this.getMusicSortableObject(electronObject);
      sortableObjects.push(o);
    }
    return sortableObjects;
  }

  getMusicSortableObject(o): MusicSortable {
    const file = o.file;
    const data = o.data;
    const emptyString = 'empty';
    const emptyNumber = 0;
    let validatedTags = emptyString;
    let validatedBpm = emptyNumber;
    if (data.comment) {
      if (data.comment.text) {
        validatedTags = data.comment.text.trim();
      }
    }
    if (data.bpm) {
      validatedBpm = this.helper.getParsedIntSimple(
        data.bpm.trim(),
        emptyNumber
      );
    }

    const musicObject = {
      dir: file,
      simple: {
        title: data.title ? data.title.trim() : emptyString,
        artist: data.artist ? data.artist.trim() : emptyString,
        album: data.album ? data.album.trim() : emptyString,
        composer: data.composer ? data.composer.trim() : emptyString,
        genre: data.genre ? data.genre.trim() : emptyString,
        year: data.year ? data.year.trim() : emptyString,
        bpm: validatedBpm,
        initialKey: data.initialKey ? data.initialKey.trim() : emptyString,
        tags: validatedTags,
      },
      tags: this.getTagsFromData(data),
      metadata: data,
    };
    return musicObject;
  }

  showPopup(titleIn, message, codeIn): void {
    const dialogMessage = {
      title: titleIn,
      list: [{ title: titleIn, content: message }],
      code: codeIn,
    };
    this.dialog.openDialog(dialogMessage).then((reply) => {});
  }

  getFilteredMusic(musicSortables: any, lessThan: boolean): void {
    return musicSortables.filter((item) => {
      for (const val of this.searchStringsArray) {
        const searchColumn = val.column;
        const b = val.search;
        if (b) {
          const a = item.simple[searchColumn];
          const match = this.isMatch(a, b, lessThan);
          if (searchColumn === 'tags') {
            if (a) {
              const tags = b.split(',');
              for (const tag of tags) {
                const matchTag = this.isMatch(a, tag, lessThan);
                if (!matchTag) {
                  return false;
                }
              }
            }
          } else {
            if (!match) {
              return false;
            }
          }
        }
      }
      return true;
    });
  }

  isMatch(a: any, b: any, lessThan: boolean): boolean {
    if (!isNaN(a)) {
      const bParsed = this.helper.getParsedIntSimple(b, 0);
      if (lessThan) {
        return a < bParsed;
      } else {
        return bParsed < a;
      }
    }
    return a.toLowerCase().indexOf(b + ''.toLowerCase()) > -1;
  }

  handleSortMusic(sort: Sort, arr: any[]): any[] {
    return arr.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title':
          return this.compare(a.simple.title, b.simple.title, isAsc);
        case 'artist':
          return this.compare(a.simple.artist, b.simple.artist, isAsc);
        case 'album':
          return this.compare(a.simple.album, b.simple.album, isAsc);
        case 'composer':
          return this.compare(a.simple.composer, b.simple.composer, isAsc);
        case 'genre':
          return this.compare(a.simple.genre, b.simple.genre, isAsc);
        case 'year':
          return this.compare(a.simple.year, b.simple.year, isAsc);
        case 'bpm':
          return this.compare(a.simple.bpm, b.simple.bpm, isAsc);
        case 'initialKey':
          return this.compare(a.simple.initialKey, b.simple.initialKey, isAsc);
        case 'tags':
          return this.compare(a.simple.tags, b.simple.tags, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  getFileName(filePath: string): string {
    return this.communicator.getFileName(filePath);
  }

  // max should be something like file array to load length
  setFeedback(isLoading: boolean, message: any): void {
    if (!isLoading) {
      this.progress = 100;
    }
    if (isLoading) {
      this.progress = 0;
      this.feedbackCounter = 0;
    }
    if (message) {
      this.feedbackCounter++;
      this.updateProgress(this.feedbackCounter, this.maxFeedbackLimit);
      if (typeof message === 'string') {
        this.feedbackSubject.next(message);
      } else {
        this.feedbackSubject.next(JSON.stringify(message));
      }
      this.progressSubject.next(this.progress);
    }
  }

  setMaxForFeedback(max: number): void {
    this.feedbackCounter = 0;
    this.maxFeedbackLimit = max;
  }

  setMessage(message: string): void {
    this.commonMessageSubject.next(message);
  }

  getMessageSubscription(): Observable<string> {
    return this.commonMessageObservable;
  }

  getFeedbackSubscription(): Observable<string> {
    return this.feedbackObservable;
  }

  getProgressSubscription(): Observable<number> {
    return this.progressObservable;
  }

  updateProgress(count: number, max: number): void {
    const percentageProgress = (count * 100) / max;
    this.progress = Math.round(percentageProgress);
  }

  setUnsubscribeTidy(subscriptions: Subscription[]): void {
    if (subscriptions) {
      for (const subscription of subscriptions) {
        if (subscription) {
          try {
            subscription.unsubscribe();
          } catch (error) {
            console.log('Failed to unsubscribe.');
            console.log(error);
          }
        }
      }
    }
    this.communicator.unsubscribeElectron();
  }

  /**
   * accepts array of tags
   * returns object to send to electron
   */
  getTagsToRequest(filePath: string, resultsArray: string[]): any {
    const tags = this.getTagsToMetadata(resultsArray);
    const options = {
      key: 'setMusicData',
      dir: filePath,
      tagsObject: tags,
    };

    return options;
  }

  setSuggestionsFromTrack(metadataObject): string[] {
    const arr = this.helper.getValuesFromKeys(
      metadataObject,
      this.metadataKeys
    );
    const uniques = this.helper.getOnlyUnique(arr);
    const trimmed = this.helper.getTrimmedArray(uniques);
    const lowered = this.helper.getLowerCaseArray(trimmed);
    return lowered;
  }

  getTagsToMetadata(resultsArray: string[]): any {
    if (resultsArray) {
      if (resultsArray.length) {
        const trimedArr = resultsArray.map((str) => str.trim().toLowerCase());
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

  getTagsFromData(data): string[] {
    if (data) {
      if (data.comment) {
        if (data.comment.text) {
          return this.getMetadataCommentAsArray(data.comment.text);
        }
      }
    }
    return [];
  }

  getMetadataCommentAsArray(comment: string): string[] {
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

  // TODO: useful: transform object of objects to array of objects
  getSuggestionsAsArray(suggestionsFromFile: any): any[] {
    const keys = Object.keys(suggestionsFromFile);
    const arr = new Array<any>(keys.length);

    Object.keys(suggestionsFromFile).forEach((key) => {
      const val = suggestionsFromFile[key];
      arr[val.i] = { name: key, color: val.color, group: val.group };
    });

    return arr;
  }

  // TODO: useful: transform object of objects to matrix array of objects
  getSuggestionsAsMatrix(suggestionsFromFile: any): any[] {
    const arr = this.getSuggestionsAsArray(suggestionsFromFile);

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
}
