import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
export enum KEY_CODE {
  RIGHT_ARROW = 'ArrowRight',
  LEFT_ARROW = 'ArrowLeft',
  LEFT_BRACKET = '[',
  RIGHT_BRACKET = ']',
}
@Component({
  selector: 'app-sortable-searchable-table',
  templateUrl: './sortable-searchable-table.component.html',
  styleUrls: ['./sortable-searchable-table.component.css'],
})
export class SortableSearchableTableComponent
  implements OnInit, OnChanges, OnDestroy {
  @Output() selectedItem = new EventEmitter<string[]>();
  @Output() tableChange = new EventEmitter<(string | number)[][]>();
  @Output() searchChange = new EventEmitter<any[]>();

  @Input() searchStringsArray = [];
  @Input() columnTitlesArray = [];
  @Input() ignoreColumns = [];
  @Input() matrixIn: (string | number)[][] = [];
  @Input() matrixOut: (string | number)[][] = [];
  currentTitle = '';
  lessThan = false;
  isAscending = false;
  @Input() isFixed = false;
  isMenuOpen = false;
  isShowCsv = false;

  currentSelectedPosition = 0;

  TABLE_EXTRA_VALUE_SPLITTER = ' ';

  constructor() {}

  ngOnInit(): void {
    this.reset();
  }

  ngOnDestroy(): void {
    if (this.selectedItem) {
      this.selectedItem.unsubscribe();
    }
    if (this.tableChange) {
      this.tableChange.unsubscribe();
    }
    if (this.searchChange) {
      this.searchChange.unsubscribe();
    }
  }

  // TODO: wrong on click

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.matrixIn) {
      if (changes.matrixIn.currentValue !== changes.matrixIn.previousValue) {
        this.reset();
        this.onDataChange();
      }
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    if (event.key === KEY_CODE.RIGHT_BRACKET) {
      this.next();
    }

    if (event.key === KEY_CODE.LEFT_BRACKET) {
      this.previous();
    }
  }

  previous(): void {
    this.setNextOrPreviousTrack(-1);
  }

  next(): void {
    this.setNextOrPreviousTrack(1);
  }

  setNextOrPreviousTrack(next: number): void {
    this.setValidatedPosition(next);
    const currentSelection = this.matrixOut[this.currentSelectedPosition];
    this.setCurrentSelection(currentSelection);
  }

  setCurrentSelection(item): void {
    if (item) {
      this.onSelectedRow(item);
    }
  }

  setValidatedPosition(next: number): void {
    this.currentSelectedPosition += next;

    if (this.currentSelectedPosition < 0) {
      this.currentSelectedPosition = this.matrixOut.length - 1;
    }
    if (this.currentSelectedPosition > this.matrixOut.length - 1) {
      this.currentSelectedPosition = 0;
    }
  }

  getCsv(): string {
    let str = this.columnTitlesArray.join(',') + '\n';
    for (const row of this.matrixOut) {
      str += row.join(',') + '\n';
    }
    return str;
  }

  canShowColumn(i: number): boolean {
    for (const ignore of this.ignoreColumns) {
      const index = this.columnTitlesArray.indexOf(ignore);
      if (index === i) {
        return false;
      }
    }
    return true;
  }

  isThisIgnored(name: string): boolean {
    return this.isInArray(name, this.ignoreColumns);
  }

  ignoreColumn(name): void {
    this.tryAddValidatedWithGroup(name, this.ignoreColumns, true, false);
  }

  tryAddValidatedWithGroup(
    value: string,
    arr: string[],
    isRemoveNonUnique: boolean,
    toLowerCase: boolean
  ): void {
    const name = value;
    const unique = this.isNotIn(name, arr);

    if (unique) {
      if ((name || '').trim()) {
        let clean = name.trim();
        if (toLowerCase) {
          clean = clean.toLowerCase();
        }
        arr.push(clean);
      }
    } else {
      if (isRemoveNonUnique) {
        this.removeFromArr(name, arr);
      }
    }
  }

  removeFromArr(tag: string, arr: any[]): void {
    const index = arr.indexOf(tag);

    if (index > -1) {
      arr.splice(index, 1);
    }
  }

  // only add if unique
  isNotIn(val: string, arr: string[]): boolean {
    return !(arr.indexOf(val) > -1);
  }

  isInArray(value: any, array: any[]): boolean {
    return array.indexOf(value) > -1;
  }

  reset(): void {
    this.searchStringsArray = [];
    for (const col of this.columnTitlesArray) {
      this.searchStringsArray.push({ column: col, search: '' });
    }
    this.matrixOut = this.getArrayCopy(this.matrixIn); // this.matrixIn;
  }

  getArrayCopy(arr: any): any[] {
    return Object.assign([], arr);
  }

  onSelectedRow(item: string[]): void {
    this.currentTitle = item[0];
    for (let i = 0; i < this.matrixOut.length; i++) {
      const val = this.matrixOut[i];
      const title = val[0];
      if (title === this.currentTitle) {
        this.currentSelectedPosition = i;
      }
    }
    this.selectedItem.emit(item);
  }

  onDataChange(): void {
    this.tableChange.emit(this.matrixOut);
  }

  onSearchFilter(): void {
    this.searchChange.emit(this.searchStringsArray);
  }

  sortData(sort: string): void {
    this.matrixOut.sort((a, b) => {
      for (let i = 0; i < this.columnTitlesArray.length; i++) {
        const title = this.columnTitlesArray[i];
        if (sort === title) {
          return this.compare(a[i], b[i], this.isAscending);
        }
      }
      return 0;
    });
    this.isAscending = !this.isAscending;
    this.onDataChange();
  }

  remove(row): void {
    this.matrixOut = this.matrixOut.filter((res) => {
      if (row[0] && res[0]) {
        return row[0] !== res[0];
      } else {
        return true;
      }
    });
    this.onDataChange();
  }

  compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  setFilter(): void {
    this.matrixOut = this.matrixIn.filter((item) => {
      for (let i = 0; i < this.searchStringsArray.length; i++) {
        const val = this.searchStringsArray[i];
        const searchColumn = val.column;
        const b = val.search;
        if (b) {
          const a = item[i];
          const match = this.isMatch(a, b);
          if (b.split(this.TABLE_EXTRA_VALUE_SPLITTER) > 0) {
            if (a) {
              const tags = b.split(this.TABLE_EXTRA_VALUE_SPLITTER);
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
    this.onSearchFilter();
    this.onDataChange();
  }

  clearSearch(): void {
    for (const val of this.searchStringsArray) {
      val.search = '';
    }
    this.setFilter();
  }

  isMatch(a: any, b: any): boolean {
    if (!isNaN(a)) {
      const bParsed = this.getParsedIntSimple(b, 0);
      if (this.lessThan) {
        return a < bParsed;
      } else {
        return bParsed < a;
      }
    }
    return a.toLowerCase().indexOf(b + ''.toLowerCase()) > -1;
  }

  getParsedIntSimple(x: any, badReturn: number): number {
    const base = 10;
    const parsed = parseInt(x, base);
    if (isNaN(parsed)) {
      return badReturn;
    }
    return parsed;
  }
}
