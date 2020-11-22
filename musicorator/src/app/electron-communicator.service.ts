import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElectronCommunicatorService {
  ipc;
  messages = new BehaviorSubject<string>('');
  directory = new BehaviorSubject<string>('');

  // TODO: look into app component, this is not necessary to edit
  constructor(private zone: NgZone) {
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
      this.sendAngular(options);
    }
  }

  listenToElectronConstantly(key: string): Observable<any> {
    if (this.ipc) {
      return this.listenElectron(key);
    } else {
      return this.listenAngular(key);
    }
  }

  private sendElectron(options: any): void {
    // TODO: this request is listened in electron app
    this.ipc.send('requestFromRenderer', options);
  }

  private sendAngular(options: any): void {
    console.log('sending to electron: ' + options.key);
  }

  private listenElectron(key: string): Observable<any> {
    const observable = new Observable((subscriber) => {
      try {
        this.ipc.on(key, (event: any, arg: any) => {
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

  private listenAngular(key: string): Observable<any> {
    // TODO: return reasonable values when running ng serve
    const observable = new Observable((subscriber) => {
      try {
        switch (key) {
          case 'openDirectory':
            subscriber.next('C:/Users');
            break;
          case 'getFilesByType':
            subscriber.next(['testdata', 't2']);
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

  getFileName(dir: string): string {
    if (dir) {
      return dir.replace(/^.*[\\\/]/, '');
    }
    return dir;
  }

  feedback(s: string): void {
    // TODO: feedback to user
    console.log(s);
  }
}
