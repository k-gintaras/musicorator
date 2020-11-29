import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class SuggestionService {
  suggestionsJson =
    '{"tags":{"quiet":{"color":"#6e40aa","group":"volume","i":0},"loud":{"color":" #773fad","group":"volume","i":1},"slow":{"color":" #813eb0","group":"speed","i":2},"progressive":{"color":" #8c3eb2","group":"speed","i":3},"fast":{"color":" #963db3","group":"speed","i":4},"flowing":{"color":" #a03db3","group":"beats","i":5},"rhythmic":{"color":" #ab3cb2","group":"beats","i":6},"classical":{"color":" #b53cb1","group":"age","i":7},"classy":{"color":" #bf3caf","group":"age","i":8},"old":{"color":" #c93dab","group":"age","i":9},"modern":{"color":" #d23ea7","group":"age","i":10},"new":{"color":" #db3fa3","group":"age","i":11},"electro":{"color":" #e4419d","group":"vocals","i":12},"vocal":{"color":" #eb4397","group":"vocals","i":13},"instrumental":{"color":" #f24591","group":"vocals","i":14},"electronic":{"color":" #f9488a","group":"instruments","i":15},"acoustic":{"color":" #fe4b83","group":"instruments","i":16},"classic":{"color":" #ff4f7b","group":"instruments","i":17},"orchestra":{"color":" #ff5473","group":"instruments","i":18},"mix":{"color":" #ff596b","group":"instruments","i":19},"guitar":{"color":" #ff5e63","group":"instruments","i":20},"piano":{"color":" #ff645c","group":"instruments","i":21},"sax":{"color":" #ff6a54","group":"instruments","i":22},"synth":{"color":" #ff714d","group":"instruments","i":23},"strings":{"color":" #ff7847","group":"instruments","i":24},"unusual":{"color":" #ff7f41","group":"funk","i":25},"beautiful":{"color":" #ff873b","group":"funk","i":26},"cool":{"color":" #ff8e37","group":"funk","i":27},"epic":{"color":" #fb9633","group":"funk","i":28},"funky":{"color":" #f59f30","group":"funk","i":29},"cute":{"color":" #efa72f","group":"attitude","i":30},"naughty":{"color":" #e9af2e","group":"attitude","i":31},"chill":{"color":" #e2b72f","group":"attitude","i":32},"neutral":{"color":" #dbbf30","group":"attitude","i":33},"serious":{"color":" #d4c733","group":"attitude","i":34},"light":{"color":" #cdcf37","group":"weight","i":35},"heavy":{"color":" #c6d63c","group":"weight","i":36},"deep":{"color":" #c0dd42","group":"pitch","i":37},"high":{"color":" #bae449","group":"pitch","i":38},"minimal":{"color":" #b4ea51","group":"melody","i":39},"melodic":{"color":" #aff05b","group":"melody","i":40},"dance":{"color":" #a3f258","group":"melody","i":41},"passive":{"color":" #97f357","group":"energy","i":42},"active":{"color":" #8bf457","group":"energy","i":43},"ambient":{"color":" #7ff658","group":"voice","i":44},"industrial":{"color":" #73f65a","group":"voice","i":45},"robo":{"color":" #67f75e","group":"voice","i":46},"male":{"color":" #5df662","group":"voice","i":47},"female":{"color":" #52f667","group":"voice","i":48},"chorus":{"color":" #49f56d","group":"voice","i":49},"gentle":{"color":" #40f373","group":"sounds","i":50},"soft":{"color":" #38f17b","group":"sounds","i":51},"balanced":{"color":" #30ef82","group":"sounds","i":52},"strong":{"color":" #2aeb8a","group":"sounds","i":53},"chillout":{"color":" #25e892","group":"genre","i":54},"atmospheric":{"color":" #21e39b","group":"genre","i":55},"house":{"color":" #1ddfa3","group":"genre","i":56},"techno":{"color":" #1bd9ab","group":"genre","i":57},"trance":{"color":" #1ad4b3","group":"genre","i":58},"dnb":{"color":" #19cebb","group":"genre","i":59},"pop":{"color":" #1ac7c2","group":"genre","i":60},"blues":{"color":" #1bc1c9","group":"genre","i":61},"rock":{"color":" #1dbace","group":"genre","i":62},"folk":{"color":" #20b2d4","group":"genre","i":63},"rap":{"color":" #23abd8","group":"genre","i":64},"tense":{"color":" #27a3dc","group":"mood","i":65},"sad":{"color":" #2c9cdf","group":"mood","i":66},"calm":{"color":" #3194e0","group":"mood","i":67},"positive":{"color":" #368ce1","group":"mood","i":68},"happy":{"color":" #3c84e1","group":"mood","i":69},"uplifting":{"color":" #417de0","group":"mood","i":70}}}';
  suggestionTagsDiscretizedAdvanced = {
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
