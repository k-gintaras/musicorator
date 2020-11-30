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

  getOnlyUnique(arr: string[]): string[] {
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
}
