import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DataProcessorService } from '../data-processor.service';
import { FileDataService } from '../file-data.service';
import { HelperService } from '../helper.service';
import { SavedAudio } from '../tag-audio/tag-audio.component';

@Component({
  selector: 'app-suggestion-filter',
  templateUrl: './suggestion-filter.component.html',
  styleUrls: ['./suggestion-filter.component.css'],
})
export class SuggestionFilterComponent implements OnInit, OnDestroy {
  constructor(
    private assistant: DataProcessorService,
    private helper: HelperService,
    private fs: FileDataService
  ) {}
  @Output() filesChange = new EventEmitter<any>();
  @Output() matrixChange = new EventEmitter<any>();
  @Output() folderChange = new EventEmitter<any>();

  @Input() suggestionMatrix = [];
  @Input() suggestionObject = [];

  // resultsMatrix
  @Input() matrixTitles = [];
  @Input() filteredMatrix = [];
  @Input() matrix = [];

  // folder
  searchValues = [];

  // filter
  searchArray = [] as { column: string; search: string }[];
  tableSearchArray = [] as { column: string; search: string }[];
  // current selection
  currentAudioArray = [];

  // display
  isSearchOn = false;
  isStepsOn = true;
  isMatrixOn = false;

  // TODO: on ad custom, let autosort
  ngOnInit(): void {}

  ngOnDestroy(): void {}

  onTableSelection(row): void {
    if (row) {
      if (row.length) {
        if (row[row.length - 1]) {
          // this.playSong(file);
          // const file = row[row.length - 1];
          this.currentAudioArray = row;
        }
      }
    }
  }

  onSavedAudio(audio: SavedAudio): void {
    if (audio) {
      const dir = audio.dir;
      const tags = audio.tags;
      this.filteredMatrix.find((res) => {
        if (res) {
          if (res.length > 0) {
            const curDir = res[res.length - 1];
            if (dir === curDir) {
              this.updateMatrixRow(res, tags);
            }
          }
        }
      });
      this.matrix.find((res) => {
        if (res) {
          if (res.length > 0) {
            const curDir = res[res.length - 1];
            if (dir === curDir) {
              this.updateMatrixRow(res, tags);
            }
          }
        }
      });
    }
  }

  updateMatrixRow(row, tags): void {
    const keys = Object.keys(this.suggestionObject);

    const rearranged = this.assistant.getSuggestionValues(
      tags,
      this.suggestionObject,
      keys
    );
    for (let i = 6; i < row.length - 1; i++) {
      row[i] = rearranged[i - 6];
    }
  }

  onTableChange(filteredMatrix: any): void {
    // this.fs.setFilteredMatrix(filteredMatrix);
    // const filteredFiles = this.getFilteredFiles(filteredMatrix);
    // this.fs.setFilteredFiles(filteredFiles);
    this.setMatrixChange(filteredMatrix);
    this.setFilesChange(filteredMatrix);
  }

  setFilesChange(filteredMatrix): void {
    this.filesChange.emit(this.getFilteredFiles(filteredMatrix));
  }

  setMatrixChange(filteredMatrix): void {
    this.matrixChange.emit(filteredMatrix);
  }

  setFolderChange(validated): void {
    const folder = this.getFolderName(validated);
    this.folderChange.emit(folder);
  }

  getFilteredFiles(matrix: any): string[] {
    const files = [];
    for (const val of matrix) {
      const file = val[val.length - 1]; // last item is dir column
      files.push(file);
    }
    return files;
  }

  onTableSearch(searchStrings: any): void {
    this.tableSearchArray = searchStrings;
    this.setSearchValues();
  }

  setSearchValues(): void {
    const fullSearch = this.searchArray.concat(this.tableSearchArray);
    const validated = [];
    for (const val of fullSearch) {
      const res = val.search;
      if (res) {
        this.helper.tryAddValidatedSimilar(res, validated, false, true, 3);
      }
    }
    // const folder = this.getFolderName(validated);
    // this.fs.setNewFolder(folder);
    this.setFolderChange(validated);
  }

  getFolderName(arr: string[]): string {
    if (arr.length === 0) {
      return 'new-folder';
    }
    return arr.join('-');
  }

  onJsonMatrixSelection(row: { name: string; group: string }): void {
    this.filteredMatrix = this.assistant.getFilteredMatrix(
      this.matrix,
      this.matrixTitles,
      this.searchArray,
      true
    );
    this.setSearchValues();
  }

  playSong(file): void {
    this.assistant.playSong(file, this.getFeedback());
  }

  getFeedback(): (s: string) => void {
    return (msg) => {
      this.feedback(msg);
    };
  }

  feedback(msg: any): void {
    this.helper.feedback(msg);
  }
}
