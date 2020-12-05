import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-matrix-stepper',
  templateUrl: './matrix-stepper.component.html',
  styleUrls: ['./matrix-stepper.component.css'],
})
export class MatrixStepperComponent implements OnInit {
  constructor() {}
  resultsArray = [];
  @Input() matrix = [];
  currentRow = { title: '', value: [{ name: '', color: '' }] };
  i = 0;

  ngOnInit(): void {
    if (this.matrix) {
      if (this.matrix.length > 0) {
        this.currentRow = this.matrix[0];
      }
    }
  }

  tryAddValidatedWithGroup(value, arr, isRemoveNonUnique): void {
    const name = value.name;
    const unique = this.isNotIn(name, arr);

    if (unique) {
      if ((name || '').trim()) {
        arr.push(name.trim().toLowerCase());
      }
    } else {
      // this.feedback('Already added.', true);
      if (isRemoveNonUnique) {
        this.removeFromArr(name, arr);
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
