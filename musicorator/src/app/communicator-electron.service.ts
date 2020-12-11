import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HelperService } from './helper.service';
import { SuggestionService } from './tagging-from-file/suggestion.service';
import { TestDataService } from './test-data.service';
import { ValidRequest } from './ValidRequest';

export interface ElectronResponse {
  key: string;
  response: any;
}

@Injectable({
  providedIn: 'root',
})
export class CommunicatorElectronService {
  // responseObject = { key: keyIn, response: responseIn };
  ipc;
  mainResponseSubscriber;
  mainResponseListener;

  // these needed to simulate data if you just use ng serve
  private electronReceiveSimulatorSubject = new BehaviorSubject<any>('');
  private electronReceiveSimulatorObservable: Observable<any> = this.electronReceiveSimulatorSubject.asObservable();
  private electronSendSimulatorSubject = new BehaviorSubject<any>('');
  private electronSendSimulatorObservable: Observable<any> = this.electronSendSimulatorSubject.asObservable();

  constructor(
    private zone: NgZone,
    private helper: HelperService,
    private t: TestDataService,
    private suggestionService: SuggestionService
  ) {
    if ((window as any).require) {
      try {
        this.ipc = (window as any).require('electron').ipcRenderer;
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Could not load electron ipc.');
      console.log('Loading Angular simulator.');
    }
  }

  /**
   * keep in mind that ngOnInit might not resubscribe to this
   * responseFromMain to use onDestroy in addition to unsubscribe
   */
  unsubscribeElectron(): void {
    if (this.mainResponseListener) {
      try {
        this.ipc.removeListener('responseFromMain', this.mainResponseListener);
      } catch (error) {
        console.log(error);
      }
      if (this.mainResponseSubscriber) {
        try {
          this.mainResponseSubscriber.unsubscribe();
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  sendToElectron(options: any): void {
    if (this.ipc) {
      this.sendElectron(options);
    } else {
      this.sendAngular(options);
    }
  }

  sendElectron(options: any): void {
    this.ipc.send('requestFromRenderer', options);
  }

  sendAngular(options: any): void {
    console.log('Sending to Electron: ' + options.key);
    this.electronSendSimulatorSubject.next(options);
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

  listenElectronResponsibly(keyIn: string): Observable<ElectronResponse> {
    return new Observable((subscriber) => {
      this.mainResponseSubscriber = subscriber;
      try {
        // needed to remove listener on destroy, eventviewer memory leak error handling
        this.mainResponseListener = (event, arg) => {
          this.zone.run(() => {
            subscriber.next(arg as ElectronResponse);
            // subscriber.complete(); if you want to stop from listening next values
          });
        };

        this.ipc.on(keyIn, this.mainResponseListener);
      } catch (error) {
        this.feedback('Electron Communicator Error: ' + error);
        subscriber.next({
          key: keyIn,
          response: 'listenElectronResponsibly() Error: ' + keyIn,
        });
        subscriber.complete();
      }
    });
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
    } as ElectronResponse;

    try {
      switch (key) {
        case ValidRequest.getFilesByType:
          console.log('Replying to: ' + ValidRequest.getFilesByType);
          responseObject.key = ValidRequest.getFilesByType;
          responseObject.response = this.t.getTestFolders();
          this.electronReceiveSimulatorSubject.next(responseObject);
          break;
        case ValidRequest.getAllMusicData:
          console.log('Replying to: ' + ValidRequest.getAllMusicData);
          responseObject.key = ValidRequest.getAllMusicData;
          responseObject.response = this.t.getTestData();
          this.electronReceiveSimulatorSubject.next(responseObject);
          break;
        case ValidRequest.getMusicData:
          console.log('Replying to: ' + ValidRequest.getMusicData);
          responseObject.key = ValidRequest.getMusicData;
          responseObject.response = this.t.getTestData()[0].data;
          this.electronReceiveSimulatorSubject.next(responseObject);
          break;
        case ValidRequest.getSettings:
          console.log('Replying to: ' + ValidRequest.getSettings);
          responseObject.key = ValidRequest.getSettings;
          responseObject.response = JSON.parse(
            this.suggestionService.suggestionsJson
          );
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
      this.feedback('Electron Communicator Error: ' + error);
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
