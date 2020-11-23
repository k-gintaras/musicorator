import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DragEditUniqueChipsService {
  private suggestionsSubject = new BehaviorSubject<string[]>([]);
  private resultsSubject = new BehaviorSubject<string[]>([]);
  private suggestionsObservable: Observable<
    string[]
  > = this.suggestionsSubject.asObservable();
  private resultsObservable: Observable<
    string[]
  > = this.resultsSubject.asObservable();
  constructor() {}

  setSuggestions(o: string[]): void {
    this.suggestionsSubject.next(o);
  }

  getSuggestionsObservable(): Observable<string[]> {
    return this.suggestionsObservable;
  }

  setResults(o: string[]): void {
    this.resultsSubject.next(o);
  }

  getResultsObservable(): Observable<string[]> {
    return this.resultsObservable;
  }
}
