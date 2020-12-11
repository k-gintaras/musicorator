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

  testData2 = [
    {
      file:
        'C:\\Users\\Ubaby\\Desktop\\To Backup\\Music\\Bands\\Dj Cam\\Dj Cam - Candyman (Frank Black).mp3',
      data: {
        title: 'Candyman',
        artist: 'Dj Cam',
        album: 'Dj Cam',
        composer: 'Frank Black',
        genre: 'Trance',
        initialKey: 'G#m',
        userDefinedText: [
          {
            description: 'SERATO_PLAYCOUNT',
            value: '0',
          },
        ],
        bpm: '170',
        comment: {
          language: 'eng',
          shortText: '',
          text:
            'old,rap,loud,slow,high,male,vocal,funky,heavy,tense,female,strong,serious,melodic,passive,rhythmic,electronic,atmospheric',
        },
        raw: {
          TIT2: 'Candyman',
          TPE1: 'Dj Cam',
          TALB: 'Dj Cam',
          TCOM: 'Frank Black',
          TKEY: 'G#m',
          TXXX: [
            {
              description: 'SERATO_PLAYCOUNT',
              value: '0',
            },
          ],
          TBPM: '170',
          COMM: {
            language: 'eng',
            shortText: '',
            text:
              'old,rap,loud,slow,high,male,vocal,funky,heavy,tense,female,strong,serious,melodic,passive,rhythmic,electronic,atmospheric',
          },
        },
      },
    },
    {
      file:
        'C:\\Users\\Ubaby\\Desktop\\To Backup\\Music\\Bands\\Dj Cam\\Dj Cam - Ganja Man.mp3',
      data: {
        title: 'Ganja Man',
        artist: 'Dj Cam',
        album: 'Dj Cam',
        composer: 'Dj Cam',
        genre: 'trance',
        initialKey: 'Am',
        userDefinedText: [
          {
            description: 'SERATO_PLAYCOUNT',
            value: '0',
          },
        ],
        bpm: '140',
        comment: {
          language: 'eng',
          shortText: '',
          text:
            'old,dnb,loud,fast,high,male,calm,vocal,funky,heavy,active,techno,flowing,serious,melodic,electronic',
        },
        raw: {
          TIT2: 'Ganja Man',
          TPE1: 'Dj Cam',
          TALB: 'Dj Cam',
          TCOM: 'Dj Cam',
          TKEY: 'Am',
          TXXX: [
            {
              description: 'SERATO_PLAYCOUNT',
              value: '0',
            },
          ],
          TBPM: '140',
          COMM: {
            language: 'eng',
            shortText: '',
            text:
              'old,dnb,loud,fast,high,male,calm,vocal,funky,heavy,active,techno,flowing,serious,melodic,electronic',
          },
        },
      },
    },
    {
      file:
        'C:\\Users\\Ubaby\\Desktop\\To Backup\\Music\\Bands\\Dj Cam\\Dj Cam - Ghetto Love.mp3',
      data: {
        title: 'Ghetto Love',
        artist: 'Dj Cam',
        album: 'Dj Cam',
        genre: 'Other',
        composer: 'Dj Cam',
        initialKey: 'C#m',
        userDefinedText: [
          {
            description: 'SERATO_PLAYCOUNT',
            value: '0',
          },
        ],
        bpm: '100',
        comment: {
          language: 'eng',
          shortText: '',
          text:
            'old,loud,slow,cool,high,heavy,tense,active,strong,female,flowing,electro,serious,melodic,ambient,timeless,electronic,atmospheric',
        },
        raw: {
          TIT2: 'Ghetto Love',
          TPE1: 'Dj Cam',
          TALB: 'Dj Cam',
          TCON: 'Other',
          TCOM: 'Dj Cam',
          TKEY: 'C#m',
          TXXX: [
            {
              description: 'SERATO_PLAYCOUNT',
              value: '0',
            },
          ],
          TBPM: '100',
          COMM: {
            language: 'eng',
            shortText: '',
            text:
              'old,loud,slow,cool,high,heavy,tense,active,strong,female,flowing,electro,serious,melodic,ambient,timeless,electronic,atmospheric',
          },
        },
      },
    },
    {
      file:
        'C:\\Users\\Ubaby\\Desktop\\To Backup\\Music\\Bands\\Dj Cam\\Dj Cam - Juliet.mp3',
      data: {
        title: 'Juliet',
        artist: 'Dj Cam',
        album: 'Dj Cam',
        composer: 'Dj Cam',
        genre: 'Rap',
        initialKey: 'F#m',
        userDefinedText: [
          {
            description: 'SERATO_PLAYCOUNT',
            value: '0',
          },
        ],
        bpm: '120',
        comment: {
          language: 'eng',
          shortText: '',
          text:
            'old,loud,high,male,calm,funky,vocal,heavy,house,active,female,techno,serious,melodic,rhythmic,balanced,timeless,electronic,progressive',
        },
        raw: {
          TIT2: 'Juliet',
          TPE1: 'Dj Cam',
          TALB: 'Dj Cam',
          TCOM: 'Dj Cam',
          TKEY: 'F#m',
          TXXX: [
            {
              description: 'SERATO_PLAYCOUNT',
              value: '0',
            },
          ],
          TBPM: '120',
          COMM: {
            language: 'eng',
            shortText: '',
            text:
              'old,loud,high,male,calm,funky,vocal,heavy,house,active,female,techno,serious,melodic,rhythmic,balanced,timeless,electronic,progressive',
          },
        },
      },
    },
    {
      file:
        'C:\\Users\\Ubaby\\Desktop\\To Backup\\Music\\Bands\\Dj Cam\\Dj Cam - Mental Invasion.mp3',
      data: {
        title: 'Mental Invasion',
        artist: 'Dj Cam',
        album: 'Dj Cam',
        composer: 'Dj Cam',
        genre: 'rap',
        initialKey: 'Fm',
        userDefinedText: [
          {
            description: 'SERATO_PLAYCOUNT',
            value: '0',
          },
        ],
        bpm: '184',
        comment: {
          language: 'eng',
          shortText: '',
          text:
            'old,rap,loud,slow,deep,male,calm,vocal,funky,heavy,serious,minimal,passive,rhythmic,balanced,electronic,atmospheric',
        },
        raw: {
          TIT2: 'Mental Invasion',
          TPE1: 'Dj Cam',
          TALB: 'Dj Cam',
          TCOM: 'Dj Cam',
          TKEY: 'Fm',
          TXXX: [
            {
              description: 'SERATO_PLAYCOUNT',
              value: '0',
            },
          ],
          TBPM: '184',
          COMM: {
            language: 'eng',
            shortText: '',
            text:
              'old,rap,loud,slow,deep,male,calm,vocal,funky,heavy,serious,minimal,passive,rhythmic,balanced,electronic,atmospheric',
          },
        },
      },
    },
    {
      file:
        'C:\\Users\\Ubaby\\Desktop\\To Backup\\Music\\Bands\\Dj Cam\\Dj Cam - Millenium.mp3',
      data: {
        title: 'Millenium',
        artist: 'Dj Cam',
        album: 'Dj Cam',
        composer: 'Dj Cam',
        initialKey: 'G#m',
        genre: 'Trance',
        userDefinedText: [
          {
            description: 'SERATO_PLAYCOUNT',
            value: '0',
          },
        ],
        bpm: '170',
        comment: {
          language: 'eng',
          shortText: '',
          text:
            'old,loud,slow,high,male,vocal,funky,heavy,tense,flowing,serious,melodic,passive,balanced,electronic,atmospheric',
        },
        raw: {
          TIT2: 'Millenium',
          TPE1: 'Dj Cam',
          TALB: 'Dj Cam',
          TCOM: 'Dj Cam',
          TKEY: 'G#m',
          TXXX: [
            {
              description: 'SERATO_PLAYCOUNT',
              value: '0',
            },
          ],
          TBPM: '170',
          COMM: {
            language: 'eng',
            shortText: '',
            text:
              'old,loud,slow,high,male,vocal,funky,heavy,tense,flowing,serious,melodic,passive,balanced,electronic,atmospheric',
          },
        },
      },
    },
    {
      file:
        'C:\\Users\\Ubaby\\Desktop\\To Backup\\Music\\Bands\\Dj Cam\\Dj Cam - Voodoo Jazz.mp3',
      data: {
        title: 'Voodoo Jazz',
        artist: 'Dj Cam',
        album: 'Dj Cam',
        composer: 'Dj Cam',
        initialKey: 'Fm',
        genre: 'Rap',
        userDefinedText: [
          {
            description: 'SERATO_PLAYCOUNT',
            value: '0',
          },
        ],
        bpm: '141',
        comment: {
          language: 'eng',
          shortText: '',
          text:
            'old,loud,slow,cute,high,jazz,vocal,funky,heavy,tense,female,flowing,melodic,passive,balanced,electronic,atmospheric',
        },
        raw: {
          TIT2: 'Voodoo Jazz',
          TPE1: 'Dj Cam',
          TALB: 'Dj Cam',
          TCOM: 'Dj Cam',
          TKEY: 'Fm',
          TXXX: [
            {
              description: 'SERATO_PLAYCOUNT',
              value: '0',
            },
          ],
          TBPM: '141',
          COMM: {
            language: 'eng',
            shortText: '',
            text:
              'old,loud,slow,cute,high,jazz,vocal,funky,heavy,tense,female,flowing,melodic,passive,balanced,electronic,atmospheric',
          },
        },
      },
    },
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
