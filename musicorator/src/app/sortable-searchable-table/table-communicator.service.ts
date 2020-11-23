import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableCommunicatorService {
  private filteredObjectsSubject = new BehaviorSubject<any[]>([]);
  private selectedObjectSubject = new BehaviorSubject<any>({});
  private filteredObjectsObservable: Observable<
    any[]
  > = this.filteredObjectsSubject.asObservable();
  private selectedObjectObservable: Observable<any> = this.selectedObjectSubject.asObservable();

  constructor() {}

  setFilteredObjects(arr: any[]): void {
    this.filteredObjectsSubject.next(arr);
  }
  setSelectedObject(o: any): void {
    this.selectedObjectSubject.next(o);
  }

  getFilteredObjectsObservable(): Observable<any[]> {
    return this.filteredObjectsObservable;
  }
  getSelectedObjectObservable(): Observable<any> {
    return this.selectedObjectObservable;
  }
}
