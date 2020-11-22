import { Component, OnInit } from '@angular/core';
import { PopupMessage } from './popup-message';
import { PopupMessagerService } from './popup-messager.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  msg: PopupMessage;
  constructor(private messager: PopupMessagerService) {}

  ngOnInit(): void {
    this.msg = this.messager.getMessage() as PopupMessage;
  }

  getCode(json: any): string {
    if (json) {
      return this.messager.getPrettyCode(json);
    } else {
      return '';
    }
  }
}
