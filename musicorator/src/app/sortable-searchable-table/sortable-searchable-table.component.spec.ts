import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortableSearchableTableComponent } from './sortable-searchable-table.component';

describe('SortableSearchableTableComponent', () => {
  let component: SortableSearchableTableComponent;
  let fixture: ComponentFixture<SortableSearchableTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortableSearchableTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortableSearchableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
