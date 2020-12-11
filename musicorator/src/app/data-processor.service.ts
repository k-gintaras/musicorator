import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CommunicatorElectronService } from './communicator-electron.service';
import { ElectronCommunicatorService } from './electron-communicator.service';
import { HelperService } from './helper.service';
import {
  MetadataObject,
  MetadataObjectSimple,
  TagObject,
} from './MetadataObject';
import { PopupService } from './popup/popup.service';
import { ValidRequest } from './ValidRequest';
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

  private musicDataResult;

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

  TABLE_EXTRA_VALUE_SPLITTER = ' ';

  constructor(
    private dialog: PopupService,
    private helper: HelperService,
    private communicator: CommunicatorElectronService
  ) {}

  getMusicDataResult(): any {
    return this.musicDataResult;
  }

  setMusicDataResult(result: any): void {
    this.musicDataResult = result;
  }

  getFilteredMatrix(
    matrixIn: any[][],
    columnNames: string[],
    searchStringsArray: { column: string; search: string }[],
    isLessThan: boolean
  ): any[][] {
    return matrixIn.filter((item) => {
      const matches = [];
      for (const val of searchStringsArray) {
        const searchColumn = val.column;
        const b = val.search;
        if (b) {
          const pos = columnNames.indexOf(searchColumn);
          // match only if matches all from search
          if (pos > -1) {
            const a = item[pos];
            const match = this.isMatch(a, b, isLessThan);
            matches.push(match);

            // return match;
            // if (a && a.indexOf(',') > -1) {
            //   const tags = b.split(',');
            //   for (const tag of tags) {
            //     const matchTag = this.isMatch(a, tag, isLessThan);
            //     if (!matchTag) {
            //       return false;
            //     }
            //   }
            // } else {
            //   if (!match) {
            //     return false;
            //   }
            // }
          }
        }
      }
      // not all match, therefore not all filter passed
      for (const val of matches) {
        if (!val) {
          return false;
        }
      }
      return true;
    });
  }

  // TODO: filter matrix useful
  // setFilter(): void {
  //   this.matrixOut = this.matrixIn.filter((item) => {
  //     for (let i = 0; i < this.searchStringsArray.length; i++) {
  //       const val = this.searchStringsArray[i];
  //       const searchColumn = val.column;
  //       const b = val.search;
  //       if (b) {
  //         const a = item[i];
  //         const match = this.isMatch(a, b);
  //         if (b.split(' ') > 0) {
  //           if (a) {
  //             const tags = b.split(' ');
  //             for (const tag of tags) {
  //               const matchTag = this.isMatch(a, tag);
  //               if (!matchTag) {
  //                 return false;
  //               }
  //             }
  //           }
  //         } else {
  //           if (!match) {
  //             return false;
  //           }
  //         }
  //       }
  //     }
  //     return true;
  //   });
  //   this.onSearchFilter();
  //   this.onDataChange();
  // }

  loadAllMusicFiles(foldersIn: string[], feedback?: (s: string) => void): void {
    this.setMaxForFeedback(foldersIn.length);
    this.sendElectron(ValidRequest.getAllMusicData, {
      folders: foldersIn,
    });
    const msg = 'Loading Files...';
    if (feedback) {
      feedback(msg);
    }
  }

  makeDir(
    whereIn: string,
    nameIn: string,
    feedback?: (s: string) => void
  ): void {
    this.setMaxForFeedback(0);
    this.sendElectron(ValidRequest.createFolder, {
      folder: whereIn,
      name: nameIn,
    });
    const msg = 'Creating Directory...';
    if (feedback) {
      feedback(msg);
    }
  }

  copyDirectory(
    folderIn: string,
    nameIn: string,
    foldersIn: string[],
    feedback?: (s: string) => void
  ): void {
    this.setMaxForFeedback(foldersIn.length);
    this.sendElectron(ValidRequest.copyAllFiles, {
      folder: folderIn,
      name: nameIn,
      folders: foldersIn,
    });
    const msg = 'Copying Directory...';
    if (feedback) {
      feedback(msg);
    }
  }

  openFolder(feedback?: (s: string) => void): void {
    this.setMaxForFeedback(0);

    this.sendElectron(ValidRequest.openDirectory, {});
    const msg = 'Opening Folder...';
    if (feedback) {
      feedback(msg);
    }
  }

  loadSettings(feedback?: (s: string) => void): void {
    this.setMaxForFeedback(0);

    this.sendElectron(ValidRequest.getSettings, {});
    const msg = 'Getting Settings...';
    if (feedback) {
      feedback(msg);
    }
  }

  playSong(file, feedback?: (s: string) => void): void {
    this.setMaxForFeedback(0);

    this.sendElectron(ValidRequest.playAudio, { dir: file });
    const msg = 'Playing Audio...';
    if (feedback) {
      feedback(msg);
    }
  }

  getFilesByType(file, fileContains, feedback?: (s: string) => void): void {
    this.setMaxForFeedback(0);

    this.sendElectron(ValidRequest.getFilesByType, {
      dir: file,
      type: fileContains,
    });
    const msg = 'Getting Files...';
    if (feedback) {
      feedback(msg);
    }
  }

  getSongData(file, feedback?: (s: string) => void): void {
    this.setMaxForFeedback(0);

    this.sendElectron(ValidRequest.getMusicData, { dir: file });
    const msg = 'Getting Audio Data...';
    if (feedback) {
      feedback(msg);
    }
  }

  saveSongData(file, tags, feedback?: (s: string) => void): void {
    this.setMaxForFeedback(0);

    this.sendElectron(ValidRequest.setMusicData, {
      dir: file,
      tagsObject: this.getTagsFormatted(tags),
    });
    const msg = 'Saving Audio Data...';
    if (feedback) {
      feedback(msg);
    }
  }

  saveSettings(settingsObject, tagsJson, feedback?: (s: string) => void): void {
    this.setMaxForFeedback(0);
    settingsObject.tags = tagsJson;
    this.sendElectron(ValidRequest.saveSettings, {
      data: settingsObject,
    });
    const msg = 'Saving Settings...';
    if (feedback) {
      feedback(msg);
    }
  }

  getTagsFormatted(arr: string[]): any {
    if (arr) {
      if (arr.length > 0) {
        const trimedArr = arr.map((str) => str.trim().toLowerCase());
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

  sendElectron(keyIn: string, options: any): void {
    options.key = keyIn;
    this.communicator.sendToElectron(options);
  }

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

  // name: string; // is also id, if duplicate, it should just pick 1?
  // dir: string;
  // newDir: string;
  // tagObjects: TagObject[];
  // isMissingTags: boolean;
  // isMoved: boolean;
  // isSelected: boolean;
  // isClicked: boolean;
  // name: string; // actual value
  // group: string; // suggestion object
  // metaDataGroup: string; // title, so on, comment
  getMetadataObject(o: any, suggestionsObject: any): MetadataObject {
    const data = {
      name: o.file ? this.getFileName(o.file) : '',
      dir: o.file ? o.file : '',
      newDir: o.file ? o.file : '',
      tagObjects: this.getTagObjects(o.data, suggestionsObject),
      isMissingTags: false,
      isMoved: false,
      isSelected: false,
      isClicked: false,
    };

    return data;
  }

  getMetadataObjectSimple(
    o: any,
    suggestionsObject: any
  ): MetadataObjectSimple {
    const data = {
      name: o.file ? this.getFileName(o.file) : '',
      dir: o.file ? o.file : '',
      newDir: o.file ? o.file : '',
      tagObjects: this.getTagObjectsSimple(o.data, suggestionsObject),
      isMissingTags: false,
      isMoved: false,
      isSelected: false,
      isClicked: false,
    };

    return data;
  }

  getMetadataObjects(result, suggestionsObject): MetadataObject[] {
    const all = [] as MetadataObject[];
    for (const row of result) {
      const m = this.getMetadataObject(row, suggestionsObject);
      all.push(m);
    }
    return all;
  }

  getMetadataObjectsSimple(result, suggestionsObject): [][] {
    const all = [];
    for (const row of result) {
      const m = this.getMetadataObjectSimple(row, suggestionsObject);
      all.push(m);
    }
    return all;
  }

  // TODO: process tags flow last array item is file
  getMetadataMatrix(result, suggestionsObject): any {
    const suggestionHeaders = Object.keys(suggestionsObject);
    suggestionHeaders.push('other'); // some tags might not be from suggestions

    const simpleHeaders = [
      'title',
      'artist',
      'album',
      'genre',
      'bpm',
      'initialKey',
    ];
    const allHeaders = simpleHeaders.concat(suggestionHeaders);
    allHeaders.push('dir');
    const all = [];
    for (const row of result) {
      const arr = this.getTagObjectsSimple(row.data, suggestionsObject);
      arr.push(row.file); // last item is file
      all.push(arr);
    }
    return [allHeaders, all];
  }

  getTagObjects(o: any, suggestionsObject: any): TagObject[] {
    // simple
    const title = o.title ? o.title : '';
    const artist = o.artist ? o.artist : '';
    const album = o.album ? o.album : '';
    const genre = o.genre ? o.genre : '';
    const bpm = o.bpm ? o.bpm : '';
    const initialKey = o.initialKey ? o.initialKey : '';

    // comment
    let commentAsArr = [];

    if (o.comment) {
      commentAsArr = o.comment.text
        ? this.getMetadataCommentAsArray(o.comment.text)
        : [];
    }

    const suggestionHeaders = Object.keys(suggestionsObject);
    suggestionHeaders.push('other'); // some tags might not be from suggestions

    const simpleHeaders = [
      'title',
      'artist',
      'album',
      'genre',
      'bpm',
      'initialKey',
    ];
    const allHeaders = simpleHeaders.concat(suggestionHeaders);

    const simpleValues = [title, artist, album, genre, bpm, initialKey];
    const suggestionValues = this.getSuggestionValues(
      commentAsArr,
      suggestionsObject,
      suggestionHeaders
    );
    const allValues = simpleValues.concat(suggestionValues);

    const arr = [] as TagObject[];
    for (let i = 0; i < allHeaders.length; i++) {
      const header = allHeaders[i];
      const value = allValues[i];
      const tagObject = { name: value, group: header } as TagObject;
      arr.push(tagObject);
    }

    return arr;
  }

  getTagObjectsSimple(o: any, suggestionsObject: any): string[] {
    // simple
    const title = o.title ? o.title : '';
    const artist = o.artist ? o.artist : '';
    const album = o.album ? o.album : '';
    const genre = o.genre ? o.genre : '';
    const bpm = o.bpm ? o.bpm : '';
    const initialKey = o.initialKey ? o.initialKey : '';

    // comment
    let commentAsArr = [];

    if (o.comment) {
      commentAsArr = o.comment.text
        ? this.getMetadataCommentAsArray(o.comment.text)
        : [];
    }

    const suggestionHeaders = Object.keys(suggestionsObject);

    const simpleValues = [title, artist, album, genre, bpm, initialKey];
    const suggestionValues = this.getSuggestionValues(
      commentAsArr,
      suggestionsObject,
      suggestionHeaders
    );

    return simpleValues.concat(suggestionValues);
  }

  getTagObjectsSimpleOld(o: any, suggestionsObject: any): string[] {
    // simple
    const title = o.title ? o.title : '';
    const artist = o.artist ? o.artist : '';
    const album = o.album ? o.album : '';
    const genre = o.genre ? o.genre : '';
    const bpm = o.bpm ? o.bpm : '';
    const initialKey = o.initialKey ? o.initialKey : '';

    // comment
    let commentAsArr = [];

    if (o.comment) {
      commentAsArr = o.comment.text
        ? this.getMetadataCommentAsArray(o.comment.text)
        : [];
    }

    const suggestionHeaders = Object.keys(suggestionsObject);
    const simpleHeaders = [
      'title',
      'artist',
      'album',
      'genre',
      'bpm',
      'initialKey',
    ];
    const allHeaders = simpleHeaders.concat(suggestionHeaders);

    const simpleValues = [title, artist, album, genre, bpm, initialKey];
    const suggestionValues = this.getSuggestionValues(
      commentAsArr,
      suggestionsObject,
      suggestionHeaders
    );
    const allValues = simpleValues.concat(suggestionValues);

    const arr = [];
    for (let i = 0; i < allHeaders.length; i++) {
      arr.push(allValues[i]);
    }

    return arr;
  }

  // TODO: process tags flow extra tags in same group are joined by ' ', so that table can sort it properly
  getSuggestionValues(
    commentAsArr,
    suggestionsObject,
    suggestionHeaders
  ): string[] {
    const all = [];
    let suggestionsAll = [];
    for (const key of suggestionHeaders) {
      const values = suggestionsObject[key];
      const selected = [];
      suggestionsAll = suggestionsAll.concat(values);
      for (const val of values) {
        if (this.helper.isInArray(val, commentAsArr)) {
          selected.push(val);
        }
      }
      all.push(selected.join(this.TABLE_EXTRA_VALUE_SPLITTER));
    }
    const otherValues = [];
    for (const val of commentAsArr) {
      if (!this.helper.isInArray(val, suggestionsAll)) {
        otherValues.push(val);
      }
    }
    all.push(otherValues.join(this.TABLE_EXTRA_VALUE_SPLITTER));
    return all;
  }

  // TODO:  process tags flow extra tags in same group are joined by ' ', so that table can sort it properly
  getTagsFromMatrixRow(matrixRow): string[] {
    const arr = [];
    if (matrixRow) {
      if (matrixRow.length > 0) {
        const tags = matrixRow.slice(6, matrixRow.length - 1);
        const rearrangedArray = tags
          .join(this.TABLE_EXTRA_VALUE_SPLITTER)
          .split(this.TABLE_EXTRA_VALUE_SPLITTER); // some values are joined with space, because of the matrix to be sortable

        return rearrangedArray.filter((res: string) => {
          if (res) {
            return true;
          } else {
            return false;
          }
        });
      }
    }
    return arr;
  }

  showPopup(titleIn, message, codeIn): void {
    const dialogMessage = {
      title: titleIn,
      list: [{ title: titleIn, content: message }],
      code: codeIn,
    };
    this.dialog.openDialog(dialogMessage).then((reply) => {});
  }

  // must be in the same order (objects and searchstrings)
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

  updateProgress(count: number, max: number): void {
    if (max > 0) {
      const percentageProgress = (count * 100) / max;
      this.progress = Math.round(percentageProgress);
    }
  }

  setMaxForFeedback(max: number): void {
    this.progress = 0;
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

  setUnsubscribeTidyWithElectron(subscriptions: Subscription[]): void {
    if (subscriptions) {
      for (const subscription of subscriptions) {
        if (subscription) {
          try {
            subscription.unsubscribe();
          } catch (error) {
            console.log('Failed to unsubscribe electron.');
            console.log(error);
          }
        }
      }
    }
    this.communicator.unsubscribeElectron();
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

  // TODO: useful: transform object of objects to matrix array of objects
  getSuggestionsAsObject(suggestionsFromFile: any): any {
    const arr = this.getSuggestionsAsArray(suggestionsFromFile);

    let currentGroup = arr[0].group;
    const matrix = {};
    let currentRow = [];
    for (const suggestionObj of arr) {
      const group = suggestionObj.group;
      if (currentGroup !== group) {
        matrix[currentGroup] = currentRow;
        currentGroup = group;
        currentRow = [];
      }
      currentRow.push(suggestionObj.name);
    }
    // last push
    matrix[currentGroup] = currentRow;

    return matrix;
  }
}
