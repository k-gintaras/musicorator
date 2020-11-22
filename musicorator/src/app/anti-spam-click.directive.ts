import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Directive({
  selector: '[appAntiSpamClick]',
})
export class AntiSpamClickDirective implements OnInit, OnDestroy {
  @Input() debounceTime = 500;

  @Output() debounceClick = new EventEmitter();

  private clicks = new Subject();
  private subscription: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.subscription = this.clicks
      .pipe(
        throttleTime(this.debounceTime, undefined, {
          leading: true,
          trailing: true,
        })
      )
      .subscribe((e) => this.debounceClick.emit(e));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('click', ['$event'])
  clickEvent(event): void {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }
}
