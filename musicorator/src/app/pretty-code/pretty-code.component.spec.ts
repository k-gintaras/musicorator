import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrettyCodeComponent } from './pretty-code.component';

describe('PrettyCodeComponent', () => {
  let component: PrettyCodeComponent;
  let fixture: ComponentFixture<PrettyCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrettyCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrettyCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
