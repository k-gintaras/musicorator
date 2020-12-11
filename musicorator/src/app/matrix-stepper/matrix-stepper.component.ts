import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
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
  selector: 'app-matrix-stepper',
  templateUrl: './matrix-stepper.component.html',
  styleUrls: ['./matrix-stepper.component.css'],
})
export class MatrixStepperComponent implements OnInit, OnDestroy, OnChanges {
  constructor() {}
  currentRow = { title: '', value: [{ name: '', color: '' }] };

  @Output() selectedItem = new EventEmitter<MatrixJsonObject>();

  @Input() resultsArray = [];
  @Input() matrix = [this.currentRow];
  i = 0;

  ngOnInit(): void {
    if (this.matrix) {
      if (this.matrix.length > 0) {
        this.currentRow = this.matrix[0];
      }
    }
  }

  ngOnDestroy(): void {
    if (this.selectedItem) {
      this.selectedItem.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.matrix) {
      if (changes.matrix.currentValue !== changes.matrix.previousValue) {
        if (this.matrix) {
          if (this.matrix.length > 0) {
            this.currentRow = this.matrix[0];
          }
        }
      }
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
        arr.push(name.trim().toLowerCase());
        this.onSelectedItem(value, true);
      }
    } else {
      // this.feedback('Already added.', true);
      if (isRemoveNonUnique) {
        this.removeFromArr(name, arr);
        this.onSelectedItem(value, false);
      }
    }
  }

  isThisTagSelected(tag: string): boolean {
    return !this.isNotIn(tag, this.resultsArray);
  }

  showNext(): void {
    this.i++;
    if (this.i > this.matrix.length - 1) {
      this.i = 0;
    }
    this.currentRow = this.matrix[this.i];
  }

  setCurrentRow(row): void {
    this.currentRow = row;
    this.i = this.getCurrentRowPosition();
  }

  getCurrentRowPosition(): number {
    for (let j = 0; j < this.matrix.length; j++) {
      const row = this.matrix[j].title;
      if (this.currentRow.title === row) {
        return j;
      }
    }
    return 0;
  }

  addUniqueItem(arr, item): void {
    if (arr.indexOf(item) === -1) {
      arr.push(item);
    }
  }

  removeFromArr(tag: string, arr: any[]): void {
    const index = arr.indexOf(tag);

    if (index >= 0) {
      arr.splice(index, 1);
    }
  }

  isNotIn(val: string, arr: string[]): boolean {
    return !(arr.indexOf(val) > -1);
  }
}
