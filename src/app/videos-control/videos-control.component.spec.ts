import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosControlComponent } from './videos-control.component';

describe('VideosControlComponent', () => {
  let component: VideosControlComponent;
  let fixture: ComponentFixture<VideosControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
