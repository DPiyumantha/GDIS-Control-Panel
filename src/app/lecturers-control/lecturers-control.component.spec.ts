import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturersControlComponent } from './lecturers-control.component';

describe('LecturersControlComponent', () => {
  let component: LecturersControlComponent;
  let fixture: ComponentFixture<LecturersControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturersControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturersControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
