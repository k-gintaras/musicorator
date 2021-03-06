import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class SuggestionService {
  suggestionTagsDiscretizedAdvanced = {
    tags: {
      weird: { color: '#6e40aa', group: 'funk', i: 0 },
      funky: { color: '#7d3faf', group: 'funk', i: 1 },
      cool: { color: '#8e3eb2', group: 'funk', i: 2 },
      cute: { color: '#9e3db3', group: 'funk', i: 3 },
      epic: { color: '#af3cb2', group: 'funk', i: 4 },
      fast: { color: '#bf3caf', group: 'speed', i: 5 },
      slow: { color: '#cf3da9', group: 'speed', i: 6 },
      chill: { color: '#dd3fa2', group: 'speed', i: 7 },
      progressive: { color: '#ea4299', group: 'speed', i: 8 },
      house: { color: '#f5468e', group: 'speed', i: 9 },
      dnb: { color: '#fe4b83', group: 'speed', i: 10 },
      electro: { color: '#ff5276', group: 'vocals', i: 11 },
      pop: { color: '#ff5a6a', group: 'vocals', i: 12 },
      vocal: { color: '#ff635d', group: 'vocals', i: 13 },
      male: { color: '#ff6d51', group: 'vocals', i: 14 },
      female: { color: '#ff7847', group: 'vocals', i: 15 },
      robo: { color: '#ff833d', group: 'vocals', i: 16 },
      uplifting: { color: '#ff9036', group: 'mood', i: 17 },
      happy: { color: '#f69d31', group: 'mood', i: 18 },
      positive: { color: '#edaa2e', group: 'mood', i: 19 },
      neutral: { color: '#d7c432', group: 'mood', i: 20 },
      passive: { color: '#ccd038', group: 'mood', i: 21 },
      sad: { color: '#c1dc41', group: 'mood', i: 22 },
      modern: { color: '#b7e64c', group: 'age', i: 23 },
      new: { color: '#aff05b', group: 'age', i: 24 },
      old: { color: '#9cf357', group: 'age', i: 25 },
      classy: { color: '#88f557', group: 'age', i: 26 },
      classical: { color: '#75f65a', group: 'age', i: 27 },
      electronic: { color: '#63f75f', group: 'instruments', i: 28 },
      intrumental: { color: '#52f667', group: 'instruments', i: 29 },
      mix: { color: '#43f471', group: 'instruments', i: 30 },
      heavy: { color: '#36f17c', group: 'instruments', i: 31 },
      light: { color: '#2bec89', group: 'instruments', i: 32 },
      rhythmic: { color: '#23e696', group: 'melody', i: 33 },
      melodic: { color: '#1ddfa3', group: 'melody', i: 34 },
      dance: { color: '#1ad6b0', group: 'melody', i: 35 },
      loud: { color: '#19cdbc', group: 'volume', i: 36 },
      quiet: { color: '#1bc2c7', group: 'volume', i: 37 },
      deep: { color: '#1eb7d1', group: 'volume', i: 38 },
      low: { color: '#23abd8', group: 'volume', i: 39 },
      high: { color: '#2a9fde', group: 'volume', i: 40 },
    },
  };
  suggestionTags = [
    'active',
    'passive',
    'positive',
    'fast',
    'slow',
    'happy',
    'sad',
    'instrumental',
    'cool',
    'weird',
    'uplifting',
    'loud',
    'quiet',
    'funky',
    'chill',
    'classical',
    'progressive',
    'electronic',
    'rap',
    'rock',
    'dance',
    'house',
    'pop',
    'dnb',
    'classy',
    'cute',
    'light',
    'heavy',
    'epic',
    'melodic',
    'rhythmic',
    'deep',
    'old',
    'new',
    'vocal',
    'female',
    'male',
  ];

  discretizedSuggestions = [
    {
      color: 'blue',
      arr: ['active', 'passive', 'fast', 'slow', 'happy', 'sad'],
    },
    {
      color: 'red',
      arr: [
        'instrumental',
        'cool',
        'weird',
        'uplifting',
        'loud',
        'quiet',
        'funky',
        'chill',
      ],
    },
    {
      color: 'pink',
      arr: [
        'classical',
        'progressive',
        'electronic',
        'rap',
        'rock',
        'dance',
        'house',
        'pop',
        'dnb',
      ],
    },
    {
      color: 'yellow',
      arr: [
        'classy',
        'cute',
        'light',
        'heavy',
        'epic',
        'melodic',
        'rhythmic',
        'deep',
      ],
    },
    { color: 'green', arr: ['old', 'new', 'vocal', 'female', 'male'] },
    { color: 'black', arr: [] },
  ];
  constructor() {}

  setSuggestionTags(suggestionTags: string[]): void {
    this.suggestionTags = suggestionTags;
  }

  setSuggestionTagsAdd(tag: string): void {
    this.suggestionTags.push(tag);
  }

  setSuggestionTagsRemove(tag: string): void {
    const index = this.suggestionTags.indexOf(tag);

    if (index >= 0) {
      this.suggestionTags.splice(index, 1);
    }
  }

  setSuggestionTagsDiscretized(
    discretizedSuggestionsIn: { color: string; arr: string[] }[]
  ): void {
    this.discretizedSuggestions = discretizedSuggestionsIn;
  }

  getSuggestionTags(): string[] {
    return this.suggestionTags;
  }
  getSuggestionTagsDiscretized(): { color: string; arr: string[] }[] {
    return this.discretizedSuggestions;
  }
}
