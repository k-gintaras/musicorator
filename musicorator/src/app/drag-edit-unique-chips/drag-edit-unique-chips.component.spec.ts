import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragEditUniqueChipsComponent } from './drag-edit-unique-chips.component';

describe('DragEditUniqueChipsComponent', () => {
  let component: DragEditUniqueChipsComponent;
  let fixture: ComponentFixture<DragEditUniqueChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragEditUniqueChipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragEditUniqueChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
