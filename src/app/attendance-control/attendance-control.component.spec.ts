import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceControlComponent } from './attendance-control.component';

describe('AttendanceControlComponent', () => {
  let component: AttendanceControlComponent;
  let fixture: ComponentFixture<AttendanceControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
