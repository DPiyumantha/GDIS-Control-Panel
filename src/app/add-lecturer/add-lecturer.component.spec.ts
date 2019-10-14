import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLecturerComponent } from './add-lecturer.component';

describe('AddLecturerComponent', () => {
  let component: AddLecturerComponent;
  let fixture: ComponentFixture<AddLecturerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLecturerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLecturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
