import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicTaggerListComponent } from './music-tagger-list.component';

describe('MusicTaggerListComponent', () => {
  let component: MusicTaggerListComponent;
  let fixture: ComponentFixture<MusicTaggerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicTaggerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicTaggerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
