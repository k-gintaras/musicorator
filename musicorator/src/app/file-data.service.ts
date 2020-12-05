import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileDataService {
  private suggestionSubject = new BehaviorSubject<any>(null);
  private suggestionsMatrixSubject = new BehaviorSubject<any>(null);
  private folderSubject = new BehaviorSubject<any>(null);
  private fileSubject = new BehaviorSubject<any>(null);
  private filesSubject = new BehaviorSubject<any>(null);
  private filteredFilesSubject = new BehaviorSubject<any>(null);
  private newFolderSubject = new BehaviorSubject<any>(null);
  private filteredMatrixSubject = new BehaviorSubject<any>(null);
  private audioDataSubject = new BehaviorSubject<any>(null);
  private currentAudioDataMatrixSubject = new BehaviorSubject<any>(null);

  private suggestionObservable: Observable<any> = this.suggestionSubject.asObservable();
  private suggestionsMatrixObservable: Observable<any> = this.suggestionsMatrixSubject.asObservable();
  private folderObservable: Observable<any> = this.folderSubject.asObservable();
  private fileObservable: Observable<any> = this.fileSubject.asObservable();
  private filesObservable: Observable<any> = this.filesSubject.asObservable();
  private filteredFilesObservable: Observable<any> = this.filteredFilesSubject.asObservable();
  private newFolderObservable: Observable<any> = this.newFolderSubject.asObservable();
  private filteredMatrixObservable: Observable<any> = this.filteredMatrixSubject.asObservable();
  private audioDataObservable: Observable<any> = this.audioDataSubject.asObservable();
  private currentAudioDataMatrixObservable: Observable<any> = this.currentAudioDataMatrixSubject.asObservable();

  constructor() {}

  setSuggestionsObject(o: any): void {
    this.suggestionSubject.next(o);
  }

  setSuggestionsMatrix(o: any): void {
    this.suggestionsMatrixSubject.next(o);
  }

  setCurrentFolder(o: any): void {
    this.folderSubject.next(o);
  }

  setCurrentFile(o: any): void {
    this.fileSubject.next(o);
  }

  setCurrentFiles(o: any): void {
    this.filesSubject.next(o);
  }

  setFilteredMatrix(o: any): void {
    this.filteredMatrixSubject.next(o);
  }

  setFilteredFiles(o: any): void {
    this.filteredFilesSubject.next(o);
  }

  setNewFolder(o: any): void {
    this.newFolderSubject.next(o);
  }

  setCurrentAudioData(o: any): void {
    this.audioDataSubject.next(o);
  }

  setCurrentAudioDataMatrix(o: any): void {
    this.currentAudioDataMatrixSubject.next(o);
  }

  getSuggestionObservable(): Observable<any> {
    return this.suggestionObservable;
  }

  getSuggestionMatrixObservable(): Observable<any> {
    return this.suggestionsMatrixObservable;
  }

  getFolderObservable(): Observable<any> {
    return this.folderObservable;
  }

  getCurrentFileObservable(): Observable<any> {
    return this.fileObservable;
  }

  getFilesObservable(): Observable<any> {
    return this.filesObservable;
  }

  getFilteredFilesObservable(): Observable<any> {
    return this.filteredFilesObservable;
  }

  getNewFolderObservable(): Observable<any> {
    return this.newFolderObservable;
  }

  getFilteredMatrixObservable(): Observable<any> {
    return this.filteredMatrixObservable;
  }

  getAudioDataObservable(): Observable<any> {
    return this.audioDataObservable;
  }

  getAudioMatrixObservable(): Observable<any> {
    return this.currentAudioDataMatrixObservable;
  }
}
