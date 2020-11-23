import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class SuggestionService {
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
