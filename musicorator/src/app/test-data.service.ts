import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestDataService {
  constructor() {}

  testFolders = [
    'C:\\Users\\Ubaby\\Desktop\\Bands\\1200 Micrograms\\1200 Micrograms - Acid.mp3',
    'C:\\Users\\Ubaby\\Desktop\\Bands\\1200 Micrograms\\1200 Micrograms - Ailasco.mp3',
    'C:\\Users\\Ubaby\\Desktop\\Bands\\1200 Micrograms\\1200 Micrograms - Cosmologist.mp3',
    'C:\\Users\\Ubaby\\Desktop\\Bands\\1200 Micrograms\\1200 Micrograms - E Mc2.mp3',
    'C:\\Users\\Ubaby\\Desktop\\Bands\\1200 Micrograms\\1200 Micrograms - Extasy.mp3',
  ];

  testData = [
    {
      file:
        'C:\\Users\\Ubaby\\Desktop\\Bands\\1200 Micrograms\\1200 Micrograms - Acid.mp3',
      data: {
        album: '1200 Micrograms',
        artist: '1200 Micrograms',
        comment: { language: 'eng', shortText: '', text: '1200 Micrograms' },
        composer: '1200 Micrograms',
        genre: 'Trance',
        title: 'Acid',
        raw: {
          TALB: '1200 Micrograms',
          TPE1: '1200 Micrograms',
          COMM: { language: 'eng', shortText: '', text: '1200 Micrograms' },
          TCOM: '1200 Micrograms',
          TCON: 'Trance',
          TIT2: 'Acid',
        },
      },
    },
    {
      file:
        'C:\\Users\\Ubaby\\Desktop\\Bands\\1200 Micrograms\\1200 Micrograms - Ailasco.mp3',
      data: {
        album: '1200 Micrograms',
        artist: '1200 Micrograms',
        comment: {
          language: 'eng',
          shortText: '',
          text: 'house,dance,happy,positive',
        },
        composer: '1200 Micrograms',
        genre: 'Trance',
        title: 'Ailasco',
        raw: {
          TALB: '1200 Micrograms',
          TPE1: '1200 Micrograms',
          COMM: { language: 'eng', shortText: '', text: '1200 Micrograms' },
          TCOM: '1200 Micrograms',
          TCON: 'Trance',
          TIT2: 'Ailasco',
        },
      },
    },
  ];

  getTestFolders(): string[] {
    return this.testFolders;
  }
  getTestData(): any[] {
    return this.testData;
  }
}
