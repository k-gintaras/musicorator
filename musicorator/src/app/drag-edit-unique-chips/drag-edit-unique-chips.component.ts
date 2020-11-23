import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { DragEditUniqueChipsService } from './drag-edit-unique-chips.service';

@Component({
  selector: 'app-drag-edit-unique-chips',
  templateUrl: './drag-edit-unique-chips.component.html',
  styleUrls: ['./drag-edit-unique-chips.component.css'],
})
export class DragEditUniqueChipsComponent
  implements OnInit, OnDestroy, OnChanges {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @Input() resultsArray: string[] = [];
  @Input() suggestionsArray: string[] = [];
  @Input() isHorizontal = true;
  @Input() hasFeedback = true;
  @Input() isAddOnClick = true;
  @Input() isAutoSort = false;
  @Input() feedbackMessage = '';
  isTimeoutSet = false;
  currentTimeout;
  colors = [
    '#6e40aa',
    '#7d3faf',
    '#8e3eb2',
    '#9e3db3',
    '#af3cb2',
    '#bf3caf',
    '#cf3da9',
    '#dd3fa2',
    '#ea4299',
    '#f5468e',
    '#fe4b83',
    '#ff5276',
    '#ff5a6a',
    '#ff635d',
    '#ff6d51',
    '#ff7847',
    '#ff833d',
    '#ff9036',
    '#f69d31',
    '#edaa2e',
    '#e2b72f',
    '#d7c432',
    '#ccd038',
    '#c1dc41',
    '#b7e64c',
    '#aff05b',
    '#9cf357',
    '#88f557',
    '#75f65a',
    '#63f75f',
    '#52f667',
    '#43f471',
    '#36f17c',
    '#2bec89',
    '#23e696',
    '#1ddfa3',
    '#1ad6b0',
    '#19cdbc',
    '#1bc2c7',
    '#1eb7d1',
    '#23abd8',
    '#2a9fde',
    '#3292e1',
    '#3a86e1',
    '#437ae0',
    '#4c6edb',
    '#5563d5',
    '#5d59cd',
    '#6450c3',
    '#6947b7',
  ];

  constructor(private service: DragEditUniqueChipsService) {}

  getColorForArrayItem(str: string): string {
    const i = this.getArrPosition(str, this.suggestionsArray);

    // exists
    if (i > -1) {
      // we have enough colors
      if (i < this.colors.length) {
        return this.colors[i];
      }
    }

    return 'grey';
  }

  ngOnInit(): void {
    if (this.isAutoSort) {
      this.sortArrayByLength(this.resultsArray);
    }
  }

  ngOnChanges(): void {
    if (this.isAutoSort) {
      this.sortArrayByLength(this.resultsArray);
    }
  }

  ngOnDestroy(): void {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
    }
  }

  // feedback(msg: string): void {
  //
  // }
  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      // moveItemInArray(
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex
      // );
    } else {
      const currentPick = event.previousContainer.data[event.previousIndex];
      // copy if unique
      // const unique = this.isNotIn(currentPick, this.resultsArray);
      // if (unique) {
      //   this.resultsArray.push(currentPick);
      // } else {
      //   this.feedback('Already added.');
      // }
      this.tryAddValidated(null, currentPick, this.resultsArray, false);
    }
  }

  addSuggestion(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    this.tryAddValidated(input, value, this.suggestionsArray, true);
  }

  sortArrayByLength(arr: string[]): void {
    arr.sort((a, b) => {
      // ASC  -> a.length - b.length
      // DESC -> b.length - a.length
      return a.length - b.length;
    });
  }

  tryAddValidated(input, value, arr, isSuggestions): void {
    const unique = this.isNotIn(value, arr);

    if (unique) {
      if ((value || '').trim()) {
        arr.push(value.trim().toLowerCase());
      }

      if (input) {
        input.value = '';
      }
    } else {
      this.feedback('Already added.');
    }

    if (this.isAutoSort) {
      this.sortArrayByLength(this.resultsArray);
    }

    if (isSuggestions) {
      this.service.setSuggestions(arr);
    } else {
      this.service.setResults(arr);
    }
  }

  removeSuggestion(tag: string): void {
    const index = this.suggestionsArray.indexOf(tag);

    if (index >= 0) {
      this.suggestionsArray.splice(index, 1);
      this.service.setSuggestions(this.suggestionsArray);
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    this.tryAddValidated(input, value, this.resultsArray, false);
  }

  remove(tag: string): void {
    const index = this.resultsArray.indexOf(tag);

    if (index >= 0) {
      this.resultsArray.splice(index, 1);
      this.service.setResults(this.resultsArray);
    }
  }

  // only add if unique
  isNotIn(val: string, arr: string[]): boolean {
    return !(arr.indexOf(val) > -1);
  }

  getArrPosition(val: string, arr: string[]): number {
    return arr.indexOf(val);
  }

  feedback(s: string): void {
    if (this.hasFeedback) {
      this.clearMessageSafely();
    }
    this.feedbackMessage = s;
  }

  clearMessageSafely(): void {
    if (!this.isTimeoutSet) {
      this.isTimeoutSet = true;
      this.currentTimeout = setTimeout(() => {
        this.feedbackMessage = '';
        this.isTimeoutSet = false;
      }, 3000);
    }
  }
}
