import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ElectronCommunicatorService } from './electron-communicator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private communicator: ElectronCommunicatorService) {}
  listeners: Subscription[] = [];
  title = 'app-name';
  @Input() folder = 'C:/Users/Guest/Desktop';
  files = [];

  ngOnInit(): void {
    // TODO: must push so you can unsubscribe or will be problematic when navigating

    this.listeners = [];
    this.listeners.push(this.getFilesListener());
    this.listeners.push(this.getFeedbackListener());
  }

  ngOnDestroy(): void {
    // TODO: must unsubscribe or will be problematic when navigating
    for (const l of this.listeners) {
      if (l) {
        l.unsubscribe();
      }
    }
  }

  // TODO: ask electron to do something
  getFiles(): void {
    const options = {
      key: 'getFilesByType',
      dir: this.folder,
      type: 'txt',
    };
    this.communicator.sendToElectron(options);
  }

  // TODO: wait for electron to respond
  getFilesListener(): Subscription {
    return this.communicator
      .listenToElectronConstantly('getFilesByType')
      .subscribe((result) => {
        console.log(result);
        this.files = result;
      });
  }

  getFeedbackListener(): Subscription {
    return this.communicator
      .listenToElectronConstantly('getFeedback')
      .subscribe((result) => {
        console.log(result);
      });
  }
}
