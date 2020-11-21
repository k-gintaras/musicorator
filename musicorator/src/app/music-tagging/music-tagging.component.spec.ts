import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicTaggingComponent } from './music-tagging.component';

describe('MusicTaggingComponent', () => {
  let component: MusicTaggingComponent;
  let fixture: ComponentFixture<MusicTaggingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicTaggingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicTaggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
