import { COMMA, SPACE } from '@angular/cdk/keycodes';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { DataProcessorService } from '../data-processor.service';
import { HelperService } from '../helper.service';
export enum KEY_CODE {
  RIGHT_ARROW = 'ArrowRight',
  LEFT_ARROW = 'ArrowLeft',
  ENTER = 'Enter',
}
export interface SavedAudio {
  dir: string;
  tags: string[];
}

@Component({
  selector: 'app-tag-audio',
  templateUrl: './tag-audio.component.html',
  styleUrls: ['./tag-audio.component.css'],
})
export class TagAudioComponent implements OnInit, OnChanges {
  @Input() audioData = [];
  @Input() matrix = [{ title: '', value: [{ name: '', color: '' }] }];
  @Output() savedAudio = new EventEmitter<SavedAudio>();

  resultsArray = [];
  suggestions = [];
  songSuggestions = [];
  custom = [];

  // settings
  isAutosort = true;
  @Input() isStepsOn = true;
  @Input() isMatrixOn = false;
  isAutoPlay = true;
  isSaveOnEnter = true;

  readonly separatorKeysCodes: number[] = [SPACE, COMMA];

  constructor(
    private helper: HelperService,
    private assistant: DataProcessorService
  ) {}

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    if (event.key === KEY_CODE.ENTER) {
      if (this.isSaveOnEnter) {
        this.save();
      }
    }
  }

  ngOnInit(): void {
    if (this.matrix) {
      for (const val of this.matrix) {
        if (val.value) {
          this.suggestions = this.suggestions.concat(val.value);
        }
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes.audioData) {
        if (
          changes.audioData.currentValue !== changes.audioData.previousValue
        ) {
          if (this.isAutoPlay) {
            this.play();
          }
          this.resultsArray = this.getAudioTags();
          this.trySort();
          if (this.matrix) {
            for (const val of this.matrix) {
              if (val.value) {
                this.suggestions = this.suggestions.concat(val.value);
              }
            }
          }
        }
      }
    }
  }

  save(): void {
    const file = this.getFile();
    const data = this.resultsArray;
    if (file && data) {
      this.assistant.saveSongData(file, data, (res) => {
        this.helper.feedback(res);
      });
      this.savedAudio.emit({ dir: file, tags: data });
    }
  }

  play(): void {
    const file = this.getFile();
    if (file) {
      this.assistant.playSong(file, (res) => {
        this.helper.feedback(res);
      });
    }
  }

  getFile(): string {
    if (this.audioData) {
      if (this.audioData.length > 0) {
        return this.audioData[this.audioData.length - 1];
      }
    }
    return '';
  }

  trySort(): void {
    if (this.isAutosort) {
      this.helper.sortArrayByLength(this.resultsArray);
    }
  }

  onStepperSelect(event): void {
    this.trySort();
  }

  onMatrixSelect(event): void {
    this.trySort();
  }

  getName(): string {
    if (this.audioData) {
      if (this.audioData.length > 0) {
        return this.audioData[0] + ' - ' + this.audioData[1];
      }
    }
    return 'name';
  }

  getAudioSuggestions(): string[] {
    const arr = [];
    if (this.audioData) {
      if (this.audioData.length > 0) {
        const audioSuggestions = this.helper.getOnlyUnique(
          this.audioData.slice(0, 6)
        );
        if (this.custom) {
          return audioSuggestions.concat(this.custom);
        } else {
          return audioSuggestions;
        }
      }
    }
    return arr;
  }

  getAudioTags(): string[] {
    return this.assistant.getTagsFromMatrixRow(this.audioData); // arr;
  }

  tryAddValidated(item): void {
    this.helper.tryAddValidated(item, this.resultsArray, true, true);
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
    this.helper.tryAddValidated(value, this.custom, false, true);
    if (input) {
      input.value = '';
    }
  }

  getColor(tag): string {
    if (this.suggestions) {
      const val = this.suggestions.find((res) => {
        return res.name === tag;
      });
      return val ? val.color : 'grey';
    }
    return 'grey';
  }

  getCommentAsArray(comment: string): string[] {
    if (comment) {
      const c = comment.toString();
      let arr = c.split(',');
      if (arr) {
        arr = this.helper.getLowerCaseArray(arr);
        return this.helper.getTrimmedArray(arr);
      }
    }
    return [''];
  }

  remove(tag: string): void {
    const index = this.resultsArray.indexOf(tag);

    if (index >= 0) {
      this.resultsArray.splice(index, 1);
    }
  }
}
