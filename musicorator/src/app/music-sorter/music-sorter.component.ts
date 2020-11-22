import { Component, OnDestroy, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { HelperService } from '../helper.service';
import { PopupService } from '../popup/popup.service';
import { MusicSortable } from './music-sortable';
import { ElectronCommunicatorService } from '../electron-communicator.service';

@Component({
  selector: 'app-music-sorter',
  templateUrl: './music-sorter.component.html',
  styleUrls: ['./music-sorter.component.css'],
})
export class MusicSorterComponent implements OnInit, OnDestroy {
  folder = 'C:/Users';
  fileContains = '.mp3';
  folders: string[] = [];
  isLoading = false;
  progress = 0;
  newDir = '';
  lessThan = true;
  feedbackCounter;
  currentFeedback;
  currentSongTitle;

  maxFeedbackValue = 0;

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

  subscriptions = [];

  musicSortables: MusicSortable[] = [];
  filteredMusic: MusicSortable[] = [];

  constructor(
    private communicator: ElectronCommunicatorService,
    private helper: HelperService,
    private dialog: PopupService
  ) {}

  ngOnInit(): void {
    this.setProgressAndFeedback(false, '', false);
    this.musicSortables = [];
    this.subscriptions = [];
    this.subscriptions.push(this.setLoadFolderListener());
    this.subscriptions.push(this.setAllMusicDataListener());
    this.subscriptions.push(this.setFeedbackListener());
    this.subscriptions.push(this.setGetFilesByTypeListener());
    this.subscriptions.push(this.setMakeDirListener());
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  makeDir(): void {
    const newFolder = this.getGeneratedDirectoryName();
    const options = {
      key: 'createFolder',
      where: this.folder,
      name: newFolder,
    };
    if (this.folder && this.folders && newFolder) {
      this.setProgressAndFeedback(true, 'Creating Directory...', true);
      this.communicator.sendToElectron(options);
    } else {
      this.feedback('Directory empty. Make.', true);
    }
  }

  copyDir(): void {
    this.makeDir();
  }

  copyDirectory(): void {
    const options = {
      key: 'copyAllFiles',
      folder: this.folder,
      name: this.getGeneratedDirectoryName(),
      folders: this.getFilteredFiles(),
    };
    if (this.folder && this.folders) {
      this.maxFeedbackValue = options.folders.length;
      this.setProgressAndFeedback(true, 'Copying Directory...', true);
      this.communicator.sendToElectron(options);
    } else {
      this.feedback('Directory empty. Copy.', true);
    }
  }

  getGeneratedDirectoryName(): string {
    const values = [];
    for (const val of this.searchStringsArray) {
      const search = val.search;
      if (search) {
        values.push(search);
      }
    }

    return values.join('-');
  }

  getFileName(n): string {
    return this.communicator.getFileName(n);
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
      dir: this.folder,
      type: this.fileContains,
    };
    this.setProgressAndFeedback(true, 'Getting Files...', true);
    this.communicator.sendToElectron(options);
  }

  loadAllFiles(): void {
    const options = {
      key: 'getAllMusicData',
      folders: this.folders,
    };
    this.maxFeedbackValue = this.folders.length;
    this.setProgressAndFeedback(true, 'Getting Music Data...', true);
    this.communicator.sendToElectron(options);
  }

  setLoadFolderListener(): Subscription {
    return this.communicator
      .listenToElectronConstantly('openDirectory')
      .subscribe((result) => {
        this.folder = result;
        this.newDir = result;
        this.musicSortables = [];
        this.filteredMusic = [];
        this.folders = [];
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
        setTimeout(() => {
          this.loadAllFiles();
        }, 500);
      });
  }

  setAllMusicDataListener(): Subscription {
    return this.communicator
      .listenToElectronConstantly('getAllMusicData')
      .subscribe((result) => {
        this.loadSortableObjects(result);
        this.setProgressAndFeedback(false, 'Received Data.', true);
      });
  }

  setFeedbackListener(): Subscription {
    this.feedbackCounter = 0;
    return this.communicator
      .listenToElectronConstantly('getFeedback')
      .subscribe((result) => {
        this.feedbackCounter++;
        this.updateProgress(this.feedbackCounter);
        this.feedback(result, false);
      });
  }

  setMakeDirListener(): Subscription {
    return this.communicator
      .listenToElectronConstantly('createFolder')
      .subscribe((result) => {
        this.copyDirectory();
        this.setProgressAndFeedback(false, result, true);
      });
  }

  setCopyAllFilesListener(): Subscription {
    return this.communicator
      .listenToElectronConstantly('copyAllFiles')
      .subscribe(() => {
        this.setProgressAndFeedback(false, 'Copied Files.', true);
      });
  }

  loadSortableObjects(result: any): void {
    for (const electronObject of result) {
      const o = this.getMusicSortableObject(electronObject);
      this.musicSortables.push(o);
      this.filteredMusic.push(o);
    }
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

  getTagsFromData(data): string[] {
    if (data) {
      if (data.comment) {
        if (data.comment.text) {
          return this.getCommentAsArray(data.comment.text);
        }
      }
    }
    return [];
  }

  getCommentAsArray(comment: string): string[] {
    if (comment) {
      const c = comment.toString();
      const arr = c.split(',');
      if (arr) {
        const trimedArr = arr.map((str) => str.trim().toLowerCase());
        return trimedArr;
      }
    }
    return [''];
  }

  updateProgress(count): void {
    const percentageProgress = (count * 100) / this.maxFeedbackValue;
    this.progress = Math.round(percentageProgress);
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
    if (isImportant) {
      this.helper.feedback(JSON.stringify(s));
    }
    this.currentFeedback = JSON.stringify(s);
  }

  openDialog(titleIn, message, codeIn): void {
    this.currentSongTitle = titleIn;

    const dialogMessage = {
      title: 'Music Data',
      list: [{ title: titleIn, content: message }],
      code: codeIn,
    };
    this.dialog.openDialog(dialogMessage).then((reply) => {});
  }

  getFilteredFiles(): string[] {
    const files = [];
    for (const val of this.filteredMusic) {
      files.push(val.dir);
    }
    return files;
  }

  setFilter(): void {
    this.newDir =
      this.folder + '/' + this.getGeneratedDirectoryName().split(',').join('-');
    this.filteredMusic = this.musicSortables.filter((item) => {
      for (const val of this.searchStringsArray) {
        const searchColumn = val.column;
        const b = val.search;
        if (b) {
          const a = item.simple[searchColumn];
          const match = this.isMatch(a, b);
          if (searchColumn === 'tags') {
            if (a) {
              const tags = b.split(',');
              for (const tag of tags) {
                const matchTag = this.isMatch(a, tag);
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

  setFilterMoreThan(): void {
    this.lessThan = !this.lessThan;
    this.setFilter();
  }

  clearSearch(): void {
    for (const val of this.searchStringsArray) {
      val.search = '';
    }
    this.setFilter();
  }

  isMatch(a: any, b: any): boolean {
    if (!isNaN(a)) {
      const bParsed = this.helper.getParsedIntSimple(b, 0);
      if (this.lessThan) {
        return a < bParsed;
      } else {
        return bParsed < a;
      }
    }
    return a.toLowerCase().indexOf(b + ''.toLowerCase()) > -1;
  }

  sortData(sort: Sort): void {
    this.filteredMusic = this.filteredMusic.sort((a, b) => {
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
}
