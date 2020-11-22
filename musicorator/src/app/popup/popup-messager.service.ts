import { Injectable } from '@angular/core';
import { PopupMessage } from './popup-message';

@Injectable({
  providedIn: 'root',
})
export class PopupMessagerService {
  msg: PopupMessage;
  constructor() {}

  setMessage(msg: PopupMessage): void {
    this.msg = msg;
  }

  getMessage(): PopupMessage {
    return this.msg;
  }

  getPrettyCode(json): string {
    // it's all thanks to
    // https://stackoverflow.com/questions/4810841/pretty-print-json-using-javascript

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
