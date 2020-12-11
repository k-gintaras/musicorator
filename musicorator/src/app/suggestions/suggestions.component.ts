import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommunicatorElectronService } from '../communicator-electron.service';
import { DataProcessorService } from '../data-processor.service';
import { ValidRequest } from '../ValidRequest';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css'],
})
export class SuggestionsComponent implements OnInit, OnDestroy {
  electronSubscriptions = [];
  feedbackMessage;
  suggestionsJson;
  settingsJson;
  maxProgress = 0;

  constructor(
    private electronCommunicator: CommunicatorElectronService,
    private assistant: DataProcessorService
  ) {}

  ngOnInit(): void {
    this.electronSubscriptions = [];
    this.electronSubscriptions.push(this.setElectronListener());
    this.electronSubscriptions.push(this.setFeedbackListener());
    this.assistant.loadSettings(this.getFeedback());
  }

  ngOnDestroy(): void {
    this.assistant.setUnsubscribeTidyWithElectron(this.electronSubscriptions);
  }

  save(): void {
    this.assistant.saveSettings(this.settingsJson, this.suggestionsJson);
  }

  onUpdatedJson(json): void {
    this.suggestionsJson = json;
  }

  getFeedback(): (s: string) => void {
    return (msg) => {
      this.feedback(msg);
    };
  }

  feedback(msg: any): void {
    this.feedbackMessage = JSON.stringify(msg);
  }

  setFeedbackListener(): Subscription {
    return this.assistant.getFeedbackSubscription().subscribe((r) => {
      this.feedbackMessage = r;
    });
  }

  /**
   * responseFromMain
   * {key: string, response: any}
   */
  setElectronListener(): Subscription {
    return this.electronCommunicator
      .listenToElectronResponsibly('responseFromMain')
      .subscribe((result) => {
        if (result) {
          this.handleResponse(result);
          this.feedback('Got Response From Electron.');
        } else {
          this.feedback('Get Data From Electron Empty.');
        }
      });
  }

  handleResponse(result): void {
    const key = result.key;
    const response = result.response;

    if (key) {
      switch (key) {
        case ValidRequest.getSettings:
          this.handleSettingsResponse(response);
          break;
        case ValidRequest.getFeedback:
          this.assistant.setFeedback(true, response);
          break;
        default:
          break;
      }
    }
  }

  handleSettingsResponse(response: any): void {
    if (response) {
      if (response.tags) {
        this.feedback('Got Settings.');
        this.suggestionsJson = response.tags;
        this.settingsJson = response;
      }
    }
  }
}
