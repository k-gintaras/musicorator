import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-drag-edit-unique-chips',
  templateUrl: './drag-edit-unique-chips.component.html',
  styleUrls: ['./drag-edit-unique-chips.component.css'],
})
export class DragEditUniqueChipsComponent implements OnInit, OnDestroy {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @Input() resultsArray: string[] = [];
  @Input() suggestionsArray: string[] = [];
  @Input() isHorizontal = true;
  @Input() hasFeedback = true;
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

  constructor() {}

  ngOnInit(): void {}
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
      const unique = this.isNotIn(currentPick, this.resultsArray);
      if (unique) {
        this.resultsArray.push(currentPick);
      } else {
        this.feedback('Already added.');
      }
    }
  }

  addSuggestion(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    const unique = this.isNotIn(value, this.suggestionsArray);

    if (unique) {
      if ((value || '').trim()) {
        this.suggestionsArray.push(value.trim().toLowerCase());
      }

      if (input) {
        input.value = '';
      }
    } else {
      this.feedback('Already added.');
    }
  }

  removeSuggestion(tag: string): void {
    const index = this.suggestionsArray.indexOf(tag);

    if (index >= 0) {
      this.suggestionsArray.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    const unique = this.isNotIn(value, this.resultsArray);

    if (unique) {
      if ((value || '').trim()) {
        this.resultsArray.push(value.trim().toLowerCase());
      }

      if (input) {
        input.value = '';
      }
    } else {
      this.feedback('Already added.');
    }
  }

  remove(tag: string): void {
    const index = this.resultsArray.indexOf(tag);

    if (index >= 0) {
      this.resultsArray.splice(index, 1);
    }
  }

  // only add if unique
  isNotIn(val: string, arr: string[]): boolean {
    return !(arr.indexOf(val) > -1);
  }

  feedback(s: string): void {
    console.log(s);
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
