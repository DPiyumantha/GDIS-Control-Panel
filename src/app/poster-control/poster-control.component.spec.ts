import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosterControlComponent } from './poster-control.component';

describe('PosterControlComponent', () => {
  let component: PosterControlComponent;
  let fixture: ComponentFixture<PosterControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosterControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosterControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
