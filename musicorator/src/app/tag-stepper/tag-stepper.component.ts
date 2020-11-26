import { SPACE, COMMA } from '@angular/cdk/keycodes';
import { Component, Input, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-tag-stepper',
  templateUrl: './tag-stepper.component.html',
  styleUrls: ['./tag-stepper.component.css'],
})
export class TagStepperComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [SPACE, COMMA];

  @Input() matrix = [];
  @Input() resultsArray = [];
  @Input() songSuggestions = [];
  custom = [];
  isOpen = false;
  @Input() isNextOnSelect = true;
  @Input() isAutoSort = false;
  currentRow;
  i = 0;

  constructor() {}

  ngOnInit(): void {
    this.i = 0;
    this.setCurrentRow(this.matrix[0]);
  }

  setCurrentRow(row): void {
    this.currentRow = row;
  }

  showNext(): void {
    this.i++;
    if (this.i > this.matrix.length - 1) {
      this.i = 0;
    }
    this.setCurrentRow(this.matrix[this.i]);
  }

  tryAddValidated(value, arr): void {
    const unique = this.isNotIn(value, arr);

    if (unique) {
      if ((value || '').trim()) {
        arr.push(value.trim().toLowerCase());
      }
    } else {
      // this.feedback('Already added.', true);
    }

    if (this.isAutoSort) {
      this.sortArrayByLength(this.resultsArray);
    }
  }

  isThisTagSelected(tag: string): boolean {
    return !this.isNotIn(tag, this.resultsArray);
  }

  sortArrayByLength(arr: string[]): void {
    arr.sort((a, b) => {
      // ASC  -> a.length - b.length
      // DESC -> b.length - a.length
      return a.length - b.length;
    });
  }

  // only add if unique
  isNotIn(val: string, arr: string[]): boolean {
    return !(arr.indexOf(val) > -1);
  }

  removeCustom(tag: string): void {
    const index = this.custom.indexOf(tag);

    if (index >= 0) {
      this.custom.splice(index, 1);
    }
  }

  addCustom(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    this.tryAddValidated(value, this.custom);
    if (input) {
      input.value = '';
    }
  }
}
