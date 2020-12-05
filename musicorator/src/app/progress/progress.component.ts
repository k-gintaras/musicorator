import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent implements OnInit, OnChanges {
  @Input() currentFeedback = '';
  @Input() isLoading = true;
  @Input() max = 100;
  progress = 0;
  progressPercentage = 0;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.progress++;
    if (this.progress > this.max) {
      this.progress = 0;
    }
    this.updateProgress(this.progress);
  }

  updateProgress(count): void {
    if (this.max > 0) {
      const percentageProgress = (count * 100) / this.max;
      this.progressPercentage = Math.round(percentageProgress);
    }
  }
}
