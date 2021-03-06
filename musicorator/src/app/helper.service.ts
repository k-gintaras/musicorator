import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupComponent } from './popup/popup.component';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {}

  feedback(s: string): void {
    this.snackBar.open(s, 'Close', {
      duration: 3000,
    });
  }

  getCsvFromMatrix(m: any): string {
    if (m) {
      if (m.length > 0) {
        if (m[0][0]) {
          const all = [];
          for (const row of m) {
            all.push(row.join(','));
          }
          return all.join('\n') + '\n';
        }
      }
    }
    return '';
  }

  tryAddValidatedSimilar(
    valIn: string,
    arr: string[],
    isRemoveNonUnique: boolean,
    toLowerCase: boolean,
    reasonableWordLength: number
  ): void {
    if (toLowerCase) {
      valIn = valIn.toLowerCase();
    }
    // add only if part does not exist
    let canAdd = true;
    for (let i = 0; i < arr.length; i++) {
      const val = arr[i];
      // reasonable word
      if (valIn.length >= reasonableWordLength) {
        // its part is in array,  oldest <<< [old,,,]
        if (valIn.indexOf(val) > -1) {
          arr[i] = valIn;
          canAdd = false;
          break;
        }
      } else {
        canAdd = false;
      }
    }
    if (canAdd) {
      this.tryAddValidated(valIn, arr, isRemoveNonUnique, toLowerCase);
    }
  }

  tryAddValidated(
    value: string,
    arr: string[],
    isRemoveNonUnique: boolean,
    toLowerCase: boolean
  ): void {
    if (toLowerCase) {
      value = value.toLowerCase();
    }
    const name = value;
    const unique = this.isNotIn(name, arr);

    if (unique) {
      if ((name || '').trim()) {
        let clean = name.trim();
        if (toLowerCase) {
          clean = clean.toLowerCase();
        }
        arr.push(clean);
      }
    } else {
      if (isRemoveNonUnique) {
        this.removeFromArr(name, arr);
      }
    }
  }

  removeFromArr(tag: string, arr: any[]): void {
    const index = arr.indexOf(tag);

    if (index > -1) {
      arr.splice(index, 1);
    }
  }

  getOnlyUnique(arr: string[]): string[] {
    // don't use empty
    arr = arr.filter((res: string) => {
      if (res) {
        return true;
      } else {
        return false;
      }
    });
    return arr.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
  }

  getParsedIntSimple(x: any, badReturn: number): number {
    const base = 10;
    const parsed = parseInt(x, base);
    if (isNaN(parsed)) {
      return badReturn;
    }
    return parsed;
  }

  getParsedInt(x: any, base: number, badReturn: number): number {
    const parsed = parseInt(x, base);
    if (isNaN(parsed)) {
      return badReturn;
    }
    return parsed;
  }

  displayPopup(array: string[]): void {
    const dialogRef = this.dialog.open(PopupComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.feedback('Replied: ' + result);
    });
  }

  sortArrayByLength(arr: string[]): void {
    arr.sort((a, b) => {
      // ASC  -> a.length - b.length
      // DESC -> b.length - a.length
      return a.length - b.length;
    });
  }

  getTrimmedArray(arr: string[]): string[] {
    return arr.map((str) => str.trim());
  }

  getLowerCaseArray(arr: string[]): string[] {
    return arr.map((str) => str.toLowerCase());
  }

  isInArray(value: any, array: any[]): boolean {
    return array.indexOf(value) > -1;
  }

  getObjectFromKeys(obj, keys): any {
    const ret = {};
    for (const key of keys) {
      if (obj[key]) {
        ret[key] = obj[key];
      }
    }
    return ret;
  }

  removeFromArray(item: string, arr: string[]): void {
    const index = arr.indexOf(item);

    if (index >= 0) {
      arr.splice(index, 1);
    }
  }

  addUniqueToArray(value, arr): void {
    const unique = this.isNotIn(value, arr);

    if (unique) {
      if (value) {
        arr.push(value);
      }
    }
  }

  // only add if unique
  isNotIn(val: string, arr: string[]): boolean {
    return !(arr.indexOf(val) > -1);
  }

  getValuesFromKeys(obj, keys): any[] {
    const ret = [];
    for (const key of keys) {
      if (obj[key]) {
        ret.push(obj[key]);
      }
    }
    return ret;
  }

  // it's all thanks to
  // https://stackoverflow.com/questions/4810841/pretty-print-json-using-javascript
  getPrettyCode(json): string {
    if (typeof json !== 'string') {
      json = JSON.stringify(json, undefined, 2);
    }

    json = json
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
      }
    );
    // add css
    // pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; }
    // .string { color: green; }
    // .number { color: darkorange; }
    // .boolean { color: blue; }
    // .null { color: magenta; }
    // .key { color: red; }
  }

  getArrayCopy(arr: any): any[] {
    return Object.assign([], arr);
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
}
