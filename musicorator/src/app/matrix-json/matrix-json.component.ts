import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

export interface MatrixJsonObject {
  search: string;
  column: string;
  color: string;
}

export interface MatrixJsonClicked extends MatrixJsonObject {
  isSelected: boolean;
}

@Component({
  selector: 'app-matrix-json',
  templateUrl: './matrix-json.component.html',
  styleUrls: ['./matrix-json.component.css'],
})
export class MatrixJsonComponent implements OnInit, OnDestroy {
  constructor() {}
  @Input() resultsArray = [];
  @Input() matrix = [];
  @Input() isSearch = false;
  @Input() searchArray = [];
  @Output() selectedItem = new EventEmitter<MatrixJsonObject>();

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.selectedItem) {
      this.selectedItem.unsubscribe();
    }
  }

  onSelectedItem(item: any, selected: boolean): void {
    const updated = item as MatrixJsonClicked;
    updated.isSelected = selected;
    this.selectedItem.emit(updated);
  }

  tryAddValidatedWithGroup(value, arr, isRemoveNonUnique): void {
    const name = value.name;
    const unique = this.isNotIn(name, arr);

    if (unique) {
      if ((name || '').trim()) {
        const clean = name.trim().toLowerCase();
        arr.push(clean);
        if (this.isSearch) {
          this.setSearchArray(value.group, clean);
        }
        this.onSelectedItem(value, true);
      }
    } else {
      if (isRemoveNonUnique) {
        this.removeFromArr(name, arr);
        this.onSelectedItem(value, false);
      }
    }
  }

  setSearchArray(groupIn, nameIn): void {
    this.searchArray.push({ search: nameIn, column: groupIn });
  }

  addUniqueItem(arr, item): void {
    if (arr.indexOf(item) === -1) {
      arr.push(item);
    }
  }

  removeFromArr(tag: string, arr: any[]): void {
    const index = arr.indexOf(tag);

    if (index > -1) {
      arr.splice(index, 1);
      if (this.isSearch) {
        // this.searchArray = this.searchArray.filter((item) => {
        //   return item.search !== tag;
        // }); // doesn't trigger change detection we need here
        this.searchArray.splice(
          this.searchArray.findIndex((e) => e.search === tag),
          1
        );
      }
    }
  }

  isNotIn(val: string, arr: string[]): boolean {
    return !(arr.indexOf(val) > -1);
  }

  isIn(val: string, arr: string[]): boolean {
    return arr.indexOf(val) > -1;
  }

  isThisTagSelected(tag: string): boolean {
    return this.isIn(tag, this.resultsArray);
  }
}
