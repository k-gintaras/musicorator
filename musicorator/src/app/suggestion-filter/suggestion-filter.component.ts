import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataProcessorService } from '../data-processor.service';
import { FileDataService } from '../file-data.service';
import { HelperService } from '../helper.service';

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
  // electron
  electronSubscriptions;

  suggestionMatrix = [];

  // resultsMatrix
  matrixTitles = [];
  filteredMatrix = [];
  matrix = [];

  // folder
  searchValues = [];

  // filter
  searchArray = [] as { column: string; search: string }[];
  tableSearchArray = [] as { column: string; search: string }[];
  // resultsArray = [];

  ngOnInit(): void {
    this.electronSubscriptions = [];
    this.electronSubscriptions.push(this.setMusicDataListener());
    this.electronSubscriptions.push(this.setSettingsListener());
  }

  ngOnDestroy(): void {
    this.assistant.setUnsubscribeTidy(this.electronSubscriptions);
  }

  onTableSelection(row): void {
    if (row) {
      if (row.length) {
        if (row[row.length - 1]) {
          const file = row[row.length - 1];
          this.playSong(file);
        }
      }
    }
  }

  onTableChange(filteredMatrix: any): void {
    this.fs.setFilteredMatrix(filteredMatrix);
    const filteredFiles = this.getFilteredFiles(filteredMatrix);
    this.fs.setFilteredFiles(filteredFiles);
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
    const folder = this.getFolderName(validated);
    this.fs.setNewFolder(folder);
  }

  getFolderName(arr: string[]): string {
    if (arr.length === 0) {
      return 'new-folder';
    }
    return arr.join('-');
  }

  setMusicDataListener(): Subscription {
    return this.fs.getAudioMatrixObservable().subscribe((res) => {
      if (res) {
        this.matrixTitles = res[0];
        this.matrix = res[1];
        this.filteredMatrix = this.matrix;
      }
    });
  }

  setSettingsListener(): Subscription {
    return this.fs.getSuggestionMatrixObservable().subscribe((res) => {
      if (res) {
        this.suggestionMatrix = res;
      }
    });
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
    console.log(msg);
  }
}
