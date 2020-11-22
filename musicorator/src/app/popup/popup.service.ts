import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupMessage } from './popup-message';
import { PopupMessagerService } from './popup-messager.service';
import { PopupComponent } from './popup.component';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor(
    public dialog: MatDialog,
    private messager: PopupMessagerService
  ) {}

  openDialog(msg: PopupMessage): Promise<any> {
    this.messager.setMessage(msg);
    const dialogRef = this.dialog.open(PopupComponent);
    const promise = dialogRef.afterClosed().toPromise();
    return promise;
  }
}
