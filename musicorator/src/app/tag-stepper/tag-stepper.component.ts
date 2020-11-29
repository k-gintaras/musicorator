import { SPACE, COMMA } from '@angular/cdk/keycodes';
import { Component, HostListener, Input, OnInit } from '@angular/core';
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
  @Input() isAutoSort = true;
  currentRow;
  i = 0;
  @Input() selectedGroups = [];

  constructor() {}

  ngOnInit(): void {
    this.i = 0;
    this.setCurrentRow(this.matrix[0]);
    this.selectedGroups = [];
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

  showNext(): void {
    this.i++;
    if (this.i > this.matrix.length - 1) {
      this.i = 0;
    }
    this.currentRow = this.matrix[this.i];
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

  tryAddValidatedWithGroup(value, arr, isRemoveNonUnique): void {
    const group = value.group;
    const name = value.name;
    const unique = this.isNotIn(name, arr);
    this.addUniqueItem(this.selectedGroups, group);

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

    if (this.isAutoSort) {
      this.sortArrayByLength(this.resultsArray);
    }
  }

  addUniqueItem(arr, item): void {
    if (arr.indexOf(item) === -1) {
      arr.push(item);
    }
  }

  isThisTagSelected(tag: string): boolean {
    return !this.isNotIn(tag, this.resultsArray);
  }

  isThisGroupSelected(group): boolean {
    return !this.isNotIn(group, this.selectedGroups);
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

  // TODO: useful
  removeFromArr(tag: string, arr: any[]): void {
    const index = arr.indexOf(tag);

    if (index >= 0) {
      arr.splice(index, 1);
    }
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
