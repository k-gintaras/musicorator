import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataProcessorService } from '../data-processor.service';
import {
  ElectronCommunicatorService,
  ValidRequest,
} from '../electron-communicator.service';

@Component({
  selector: 'app-suggestion-filter',
  templateUrl: './suggestion-filter.component.html',
  styleUrls: ['./suggestion-filter.component.css'],
})
export class SuggestionFilterComponent implements OnInit, OnDestroy {
  constructor(
    private electronCommunicator: ElectronCommunicatorService,
    private assistant: DataProcessorService
  ) {}
  // electron
  electronSubscriptions;

  // progress
  isLoading = false;
  progress = 0;
  currentFeedback = '';

  ngOnInit(): void {
    this.electronSubscriptions = [];
    this.electronSubscriptions.push(this.setElectronListener());
  }

  ngOnDestroy(): void {
    this.assistant.setUnsubscribeTidy(this.electronSubscriptions);
  }

  openFolder(): void {
    this.sendElectron(ValidRequest.openDirectory, '', 'Opening Folder');
  }

  sendElectron(command: string, dataIn: any, feedbackMessage: string): void {
    const options = {
      key: command,
      data: dataIn,
    };
    this.feedbackProgress(feedbackMessage);
    this.electronCommunicator.sendToElectron(options);
  }

  feedbackProgress(msg): void {
    // this.setProgressAndFeedback(true, 'Getting Settings...', false);
    console.log(msg);
  }

  /**
   * responseFromMain
   * {key: string, response: any}
   */
  setElectronListener(): Subscription {
    return this.electronCommunicator
      .listenToElectronResponsibly('responseFromMain')
      .subscribe((result) => {
        console.log('just regular angular response for now');
        console.log('response');
        if (result) {
          const key = result.key;
          const response = result.response;
          console.log('just regular angular response for now');
          console.log(response);

          if (key) {
            switch (key) {
              case ValidRequest.openDirectory:
                console.log(
                  'opened directory in very advanced technological way oh my man'
                );
                console.log(response);
                break;

              default:
                break;
            }
          }
          // this.setProgressAndFeedback(false, 'Got Settings.', false);
        } else {
          // this.setProgressAndFeedback(false, 'Get Settings Failed.', false);
        }
      });
  }
}
