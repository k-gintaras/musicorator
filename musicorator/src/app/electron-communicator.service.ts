import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HelperService } from './helper.service';
import { TestDataService } from './test-data.service';
// const ipc = (window as any).require('electron').ipcRenderer;

@Injectable({
  providedIn: 'root',
})
export class ElectronCommunicatorService {
  ipc;
  messages = new BehaviorSubject<string>('');
  directory = new BehaviorSubject<string>('');

  constructor(
    private zone: NgZone,
    private helper: HelperService,
    private t: TestDataService
  ) {
    if ((window as any).require) {
      try {
        this.ipc = (window as any).require('electron').ipcRenderer;
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Could not load electron ipc');
    }
  }

  sendToElectron(options: any): void {
    if (this.ipc) {
      this.sendElectron(options);
    } else {
      // this.sendAngular(key, options);
    }
  }

  // sendToElectron(key: string, parameters: any[]): void {
  //   if (this.ipc) {
  //     this.sendElectron(key, parameters);
  //   } else {
  //     this.sendAngular(key, parameters);
  //   }
  // }

  listenToElectronConstantly(key: string): Observable<any> {
    if (this.ipc) {
      return this.listenElectron(key);
    } else {
      return this.listenAngular(key);
    }
  }

  sendElectron(options: any): void {
    this.ipc.send('requestFromRenderer', options);
  }

  // sendElectron(key: string, options: {}): void {
  //   this.ipc.send(key, options);
  // }

  sendAngular(key: string, parameters: string[]): void {
    console.log('sending to electron: ' + key);
  }

  listenElectron(key: string): Observable<any> {
    const observable = new Observable((subscriber) => {
      try {
        this.ipc.on(key, (event, arg) => {
          this.zone.run(() => {
            subscriber.next(arg);
            // subscriber.complete(); if you want to stop from listening next values
          });
        });
      } catch (error) {
        this.feedback('Electron Communicator Error: ' + error);
        subscriber.next('listenToElectronConstantly Error: ' + key);
        subscriber.complete();
      }
    });
    return observable;
  }

  listenAngular(key: string): Observable<any> {
    const observable = new Observable((subscriber) => {
      try {
        switch (key) {
          case 'openDirectory':
            subscriber.next('C:/Users');
            break;
          case 'getFilesByType':
            subscriber.next(this.t.getTestFolders());
            break;
          case 'getAllMusicData':
            subscriber.next(this.t.getTestData());
            break;
          case 'getMusicData':
            subscriber.next(this.t.getTestData()[0].data);
            break;

          default:
            break;
        }
      } catch (error) {
        this.feedback('Electron Communicator Error: ' + error);
        subscriber.next('listenToElectronConstantly Error: ' + key);
        subscriber.complete();
      }
    });
    return observable;
  }

  getFileName(dir): string {
    if (dir) {
      return dir.replace(/^.*[\\\/]/, '');
    }
    return dir;
  }

  feedback(s): void {
    this.helper.feedback(s);
  }
}
