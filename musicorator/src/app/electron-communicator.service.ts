import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HelperService } from './helper.service';
import { SuggestionService } from './tagging-from-file/suggestion.service';
import { TestDataService } from './test-data.service';
import { ValidRequest } from './ValidRequest';
declare global {
  interface Window {
    electron: any;
  }
}
// const ipc = (window as any).require('electron').ipcRenderer;
@Injectable({
  providedIn: 'root',
})
export class ElectronCommunicatorService {
  ipc;
  mainResponseObservable;

  // these needed to simulate data if you just use ng serve
  private electronReceiveSimulatorSubject = new BehaviorSubject<any>('');
  private electronReceiveSimulatorObservable: Observable<any> =
    this.electronReceiveSimulatorSubject.asObservable();
  private electronSendSimulatorSubject = new BehaviorSubject<any>('');
  private electronSendSimulatorObservable: Observable<any> =
    this.electronSendSimulatorSubject.asObservable();

  private removeListenerFunctions: { [key: string]: () => void } = {};

  constructor(
    private zone: NgZone,
    private helper: HelperService,
    private t: TestDataService,
    private suggestionService: SuggestionService
  ) {
    this.initializeIpc();

    // if ((window as any).require) {
    //   try {
    //     // this.ipc = ipcRenderer;
    //     this.ipc = (window as any).require('electron').ipcRenderer;
    //     // this.ipc = this.electronService.ipcRenderer;
    //   } catch (error) {
    //     console.log(
    //       'WTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'
    //     );
    //     console.log(error);
    //   }
    // } else {
    //   console.log('Could not load electron ipc');
    // }
  }

  private initializeIpc(): void {
    // Access ipcRenderer via the contextBridge exposed API
    if (window.electron) {
      this.ipc = window.electron;
    } else {
      console.log('Could not load Electron ipc');
    }
  }

  sendToElectron(options: any): void {
    if (this.ipc) {
      this.sendElectron(options);
    } else {
      this.sendAngular(options);
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

  /**
   * responseFromMain
   * {key: string, response: any}
   */
  listenToElectronResponsibly(key: string): Observable<any> {
    if (this.ipc) {
      return this.listenElectronResponsibly(key);
    } else {
      return this.listenAngularResponsibly();
    }
  }

  sendElectron(options: any): void {
    this.ipc.send('requestFromRenderer', options);
  }

  // TODO: you can try this, but this creates lots of listeners and gets memory leak warning
  // sendElectron(key: string, options: {}): void {
  //   this.ipc.send(key, options);
  // }

  sendAngular(options: any): void {
    console.log('sending to electron: ' + options.key);
    this.electronSendSimulatorSubject.next(options);
  }

  listenElectron(key: string): Observable<any> {
    return new Observable((subscriber) => {
      try {
        const removeListener = window.electron.receive(key, (arg) => {
          this.zone.run(() => {
            subscriber.next(arg);
            console.log('Received message from electron:', arg);
          });
        });

        // Store the removeListener function to use it later for unsubscribing
        this.removeListenerFunctions[key] = removeListener;
      } catch (error) {
        console.error('7 Electron Communicator Error:', error);
        subscriber.error(error);
      }
    });
  }

  unsubscribeElectron(key: string): void {
    if (this.removeListenerFunctions[key]) {
      this.removeListenerFunctions[key]();
      delete this.removeListenerFunctions[key];
    }
  }

  // listenElectron(key: string): Observable<any> {
  //   const observable = new Observable((subscriber) => {
  //     try {
  //       this.ipc.on(key, (event, arg) => {
  //         this.zone.run(() => {
  //           subscriber.next(arg);
  //           console.log('received message from electron');
  //           console.log(arg);
  //           // subscriber.complete(); if you want to stop from listening next values
  //         });
  //       });
  //     } catch (error) {
  //       this.feedback('Electron Communicator Error: ' + error);
  //       subscriber.next('listenToElectronConstantly() Error: ' + key);
  //       subscriber.complete();
  //     }
  //   });
  //   return observable;
  // }

  /**
   * responseFromMain
   * {key: string, response: any}
   */
  listenElectronResponsibly(key: string): Observable<any> {
    this.mainResponseObservable = new Observable((subscriber) => {
      try {
        this.ipc.on(key, (event, arg) => {
          this.zone.run(() => {
            subscriber.next(arg);
            // subscriber.complete(); if you want to stop from listening next values
          });
        });
      } catch (error) {
        this.feedback('4 Electron Communicator Error: ' + error);
        subscriber.next('listenElectronResponsibly() Error: ' + key);
        subscriber.complete();
      }
    });
    return this.mainResponseObservable;
  }

  /**
   * responseFromMain to use onDestroy in addition to unsubscribe
   */
  // unsubscribeElectron(): void {
  //   if (this.mainResponseObservable) {
  //     this.ipc.removeListener('responseFromMain', this.mainResponseObservable);
  //   }
  // }

  listenAngular(key: string): Observable<any> {
    const responseObject = {
      key: 'testResponseOne',
      response: JSON.parse(this.suggestionService.suggestionsJson),
    };

    const observable = new Observable((subscriber) => {
      try {
        switch (key) {
          case 'getFilesByType':
            subscriber.next(this.t.getTestFolders());
            break;
          case 'getAllMusicData':
            subscriber.next(this.t.getTestData());
            break;
          case 'getMusicData':
            subscriber.next(this.t.getTestData()[0].data);
            break;
          case 'getSettings':
            subscriber.next(JSON.parse(this.suggestionService.suggestionsJson));
            break;
          case 'getTestResponseSettingsOne':
            subscriber.next(responseObject);
            break;
          case ValidRequest.openDirectory:
            subscriber.next('C:/Users');
            break;

          default:
            break;
        }
      } catch (error) {
        this.feedback('5 Electron Communicator Error: ' + error);
        subscriber.next('listenToElectronConstantly Error: ' + key);
        subscriber.complete();
      }
    });
    return observable;
  }

  listenAngularResponsibly(): Observable<any> {
    this.electronSendSimulatorObservable.subscribe((response) => {
      console.log('Received Request From Angular: ');
      console.log(response);
      this.handleSimulatedResponse(response);
    });
    return this.electronReceiveSimulatorObservable;
  }

  handleSimulatedResponse(r): void {
    const key = r.key;
    const data = r.response;

    const responseObject = {
      key: 'testResponseOne',
      response: JSON.parse(this.suggestionService.suggestionsJson),
    };

    try {
      switch (key) {
        case 'getFilesByType':
          this.electronReceiveSimulatorSubject.next(this.t.getTestFolders());
          break;
        case 'getAllMusicData':
          this.electronReceiveSimulatorSubject.next(this.t.getTestData());
          break;
        case 'getMusicData':
          this.electronReceiveSimulatorSubject.next(
            this.t.getTestData()[0].data
          );
          break;
        case 'getSettings':
          this.electronReceiveSimulatorSubject.next(
            JSON.parse(this.suggestionService.suggestionsJson)
          );
          break;
        case 'getTestResponseSettingsOne':
          this.electronReceiveSimulatorSubject.next(responseObject);
          break;
        case ValidRequest.openDirectory:
          console.log('Replying to: ' + ValidRequest.openDirectory);
          responseObject.key = ValidRequest.openDirectory;
          responseObject.response = 'C:/Users';
          this.electronReceiveSimulatorSubject.next(responseObject);
          break;

        default:
          break;
      }
    } catch (error) {
      this.feedback('6 Electron Communicator Error: ' + error);
      this.electronReceiveSimulatorSubject.next(
        'listenToElectronConstantly Error: ' + key
      );
      this.electronReceiveSimulatorSubject.complete();
    }
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
