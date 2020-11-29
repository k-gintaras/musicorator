import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ElectronCommunicatorService } from '../electron-communicator.service';
import { HelperService } from '../helper.service';

export interface SuggestionObject {
  color: string;
  group: string;
  i: number;
}

export interface SuggestionArrayObject {
  name: string;
  group: string;
  color: string;
}

export interface SuggestionObjectsMap {
  name: SuggestionObject;
}

@Component({
  selector: 'app-suggestion-manager',
  templateUrl: './suggestion-manager.component.html',
  styleUrls: ['./suggestion-manager.component.css'],
})
export class SuggestionManagerComponent implements OnInit, OnDestroy {
  constructor(
    private communicator: ElectronCommunicatorService,
    private helper: HelperService
  ) {}
  settingsFileObject;
  suggestionsFromFile: SuggestionObjectsMap;
  suggestionsAsArray: SuggestionArrayObject[];
  suggestionsAsMatrix;
  groups = [];

  bigMatrix = { names: [], colors: [], groups: [] };

  suggestionsBin = [];
  groupsBin = ['placeholder'];

  // other
  subscriptions = [];

  // feedback
  isLoading;
  progress;
  feedbackCounter;
  currentFeedback;

  currentName = '';
  currentGroupName = '';
  currentColorArrayString = '';

  defaultColors =
    '#6e40aa, #7d3faf, #8e3eb2, #9e3db3, #af3cb2, #bf3caf, #cf3da9, #dd3fa2, #ea4299, #f5468e, #fe4b83, #ff5276, #ff5a6a, #ff635d, #ff6d51, #ff7847, #ff833d, #ff9036, #f69d31, #edaa2e, #e2b72f, #d7c432, #ccd038, #c1dc41, #b7e64c, #aff05b, #9cf357, #88f557, #75f65a, #63f75f, #52f667, #43f471, #36f17c, #2bec89, #23e696, #1ddfa3, #1ad6b0, #19cdbc, #1bc2c7, #1eb7d1, #23abd8, #2a9fde, #3292e1, #3a86e1, #437ae0, #4c6edb, #5563d5, #5d59cd, #6450c3, #6947b7';

  ngOnInit(): void {
    this.loadSettings();
    this.setProgressAndFeedback(false, '', false);
    this.subscriptions = [];
    this.subscriptions.push(this.setGetSettingsListener());
    this.subscriptions.push(this.setSaveSettingsListener());
  }

  getSettingsRemapped(): SuggestionObjectsMap {
    const settingsObject = {} as SuggestionObjectsMap;
    const cols = this.bigMatrix.colors;

    for (let j = 0; j < this.suggestionsAsArray.length; j++) {
      const suggestion = this.suggestionsAsArray[j];
      let c = 'grey';
      if (j < cols.length) {
        c = cols[j];
      }
      const remapped = {
        color: c,
        group: suggestion.group,
        i: j,
      } as SuggestionObject;
      settingsObject[suggestion.name] = remapped;
    }

    return settingsObject;
  }

  saveSettings(): void {
    const tags = this.getSettingsRemapped();
    this.settingsFileObject.tags = tags;

    const options = {
      key: 'saveSettings',
      data: this.settingsFileObject,
    };
    this.setProgressAndFeedback(true, 'Getting Settings...', false);
    this.communicator.sendToElectron(options);
  }

  addTag(): void {
    if (this.currentName && this.currentName) {
      const o = {
        name: this.currentName,
        group: this.currentGroupName,
        color: 'grey',
      };

      const unique = this.isUniqueObject(o, 'name', this.suggestionsAsArray);
      if (unique) {
        this.suggestionsAsArray.push(o);
        this.feedback('Added To The Bottom', true);
      } else {
        this.feedback('Already Added', true);
      }

      this.addUniqueItem(this.groups, this.currentGroupName);
    } else {
      this.feedback('Will not add empty.', true);
    }
  }

  setNewColors(): void {
    this.bigMatrix.colors = this.currentColorArrayString.split(',');
  }

  setDefaultColors(): void {
    this.bigMatrix.colors = this.defaultColors.split(',');
  }

  setSaveSettingsListener(): Subscription {
    return this.communicator
      .listenToElectronConstantly('saveSettings')
      .subscribe((result) => {
        this.setProgressAndFeedback(false, 'Saved Settings.', true);
      });
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      if (subscription) {
        try {
          subscription.next();
          subscription.complete();
          subscription.unsubscribe();
        } catch (error) {}
      }
    }
  }

  addUniqueItem(arr, item): void {
    if (arr.indexOf(item) === -1) {
      arr.push(item);
    }
  }

  setGetSettingsListener(): Subscription {
    return this.communicator
      .listenToElectronConstantly('getSettings')
      .subscribe((result) => {
        if (result) {
          this.settingsFileObject = result;
          this.suggestionsFromFile = this.settingsFileObject
            .tags as SuggestionObjectsMap;
          this.suggestionsAsArray = this.getSuggestionsAsArray() as SuggestionArrayObject[];
          this.suggestionsAsMatrix = this.getSuggestionsAsMatrix();
          this.bigMatrix = this.getSuggestionsAsBigMatrix();
          this.groups = this.getGroups();
          this.currentColorArrayString = this.bigMatrix.colors.join(',');
          this.setProgressAndFeedback(false, 'Got Settings.', false);
        } else {
          this.setProgressAndFeedback(false, 'Get Settings Failed.', false);
        }
      });
  }

  getSuggestionsAsArray(): any[] {
    const keys = Object.keys(this.suggestionsFromFile);
    const arr = new Array<any>(keys.length);

    Object.keys(this.suggestionsFromFile).forEach((key) => {
      const val = this.suggestionsFromFile[key];
      arr[val.i] = { name: key, color: val.color, group: val.group };
    });

    return arr;
  }

  getGroups(): any[] {
    const arr = [];

    Object.keys(this.suggestionsFromFile).forEach((key) => {
      const val = this.suggestionsFromFile[key];
      this.addUniqueItem(arr, val.group);
    });

    return arr;
  }

  getSuggestionsAsBigMatrix(): any {
    const arr = { names: [], colors: [], groups: [] };
    const names = [];
    const colors = [];
    const groups = [];
    Object.keys(this.suggestionsFromFile).forEach((key) => {
      const val = this.suggestionsFromFile[key];
      names.push(key);
      colors.push(val.color);
      groups.push(val.group);
    });
    arr.names = names;
    arr.colors = colors;
    arr.groups = groups;

    return arr;
  }

  getSuggestionsAsMatrix(): any[] {
    const keys = Object.keys(this.suggestionsFromFile);
    const arr = new Array<any>(keys.length);

    Object.keys(this.suggestionsFromFile).forEach((key) => {
      const val = this.suggestionsFromFile[key];
      arr[val.i] = { name: key, color: val.color, group: val.group };
    });

    let currentGroup = arr[0].group;
    const matrix = [];
    let currentRow = [];
    for (const suggestionObj of arr) {
      const group = suggestionObj.group;
      if (currentGroup !== group) {
        matrix.push({ title: currentGroup, value: currentRow });

        currentGroup = group;
        currentRow = [];
      }
      currentRow.push(suggestionObj);
    }
    // last push
    matrix.push({ title: currentGroup, value: currentRow });

    return matrix;
  }

  loadSettings(): void {
    const options = {
      key: 'getSettings',
    };
    this.setProgressAndFeedback(true, 'Getting Settings...', false);
    this.communicator.sendToElectron(options);
  }

  setProgressAndFeedback(b: boolean, s: any, isImportant: boolean): void {
    this.isLoading = b;
    if (!b) {
      this.progress = 100;
    }
    if (b) {
      this.progress = 0;
      this.feedbackCounter = 0;
    }
    if (s) {
      this.feedback(s, isImportant);
    }
  }

  getFeedBack(): string {
    return this.currentFeedback;
  }

  feedback(s: any, isImportant: boolean): void {
    if (isImportant) {
      this.helper.feedback(JSON.stringify(s));
    }
    this.currentFeedback = JSON.stringify(s);
  }

  groupGroups(): void {
    this.suggestionsAsArray = this.groupByArrayKey(
      this.suggestionsAsArray,
      'group'
    );
  }

  /**
   *
   * https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
   * @description
   * Takes an Array<V>, and a grouping function,
   * and returns a Map of the array grouped by the grouping function.
   *
   * @param list An array of type V.
   * @param keyGetter A Function that takes the the Array type V as an input, and returns a value of type K.
   *                  K is generally intended to be a property key of V.
   *
   * @returns Map of the array grouped by the grouping function.
   */
  // export function groupBy<K, V>(list: Array<V>, keyGetter: (input: V) => K): Map<K, Array<V>> {
  //    const map = new Map<K, Array<V>>();
  groupBy(list, keyGetter): any {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  groupByArray(list, keyGetter): any {
    const map = new Map();

    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });

    const valueMatrix = map.values();
    const arr = [];
    for (const valueArray of valueMatrix) {
      arr.concat(valueArray);
    }

    return arr;
  }

  groupByArrayKey(list, keyToSearch): any {
    const map = new Map();

    list.forEach((item) => {
      const key = item[keyToSearch];
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });

    const valueMatrix = map.values();
    let arr = [];
    for (const valueArray of valueMatrix) {
      arr = arr.concat(valueArray);
    }

    return arr;
  }

  drop(event: CdkDragDrop<string[]>): void {
    const isUnique = this.isUniqueObject(
      event.previousContainer.data[event.previousIndex],
      'name',
      event.container.data
    );

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      if (isUnique) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      } else {
        this.feedback('Already Added', true);
      }
    }
  }

  // TODO: useful
  isUniqueObject(itemObjectToAdd, keyToSearch, arrayOfObjects): boolean {
    for (const o of arrayOfObjects) {
      const name = o[keyToSearch];
      if (name === itemObjectToAdd[keyToSearch]) {
        return false;
      }
    }
    return true;
  }

  dropGroup(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.moveGroup(
        event.container.data[event.currentIndex],
        event.currentIndex
      );
    }
  }

  moveGroup(group, i): void {
    this.suggestionsAsArray = this.getMovedGroup(
      this.suggestionsAsArray,
      'group',
      group,
      i
    );
  }

  // TODO: useful for managing jsons
  getMovedGroup(arr, groupKey, groupValue, i): any[] {
    if (i === 0) {
      // just move to top
      return this.moveArrayObjectGroup(arr, groupKey, groupValue, 0);
    }
    if (i === this.groups.length - 1) {
      // just move to bottom
      return this.moveArrayObjectGroup(
        arr,
        groupKey,
        groupValue,
        arr.length - 1
      );
    }

    if (i > 0 && i < this.groups.length - 1) {
      const previous = this.groups[i + 1];
      for (let j = 0; j < arr.length; j++) {
        const cur = arr[j];
        if (cur.group === previous) {
          return this.moveArrayObjectGroup(arr, groupKey, groupValue, j);
        }
      }
    }
    return arr;
  }

  moveArrayObjectGroup(arrayToProcess, keyToProcess, keyValueToFind, i): any[] {
    const filteredWithout = arrayToProcess.filter((row) => {
      return row[keyToProcess] !== keyValueToFind;
    });

    const filteredWith = arrayToProcess.filter((row) => {
      return row[keyToProcess] === keyValueToFind;
    });
    filteredWithout.splice(i, 0, ...filteredWith);
    return filteredWithout;
  }
}
