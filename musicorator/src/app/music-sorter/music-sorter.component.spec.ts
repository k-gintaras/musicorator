import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicSorterComponent } from './music-sorter.component';

describe('MusicSorterComponent', () => {
  let component: MusicSorterComponent;
  let fixture: ComponentFixture<MusicSorterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicSorterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicSorterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
