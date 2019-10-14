import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeboardControlComponent } from './noticeboard-control.component';

describe('NoticeboardControlComponent', () => {
  let component: NoticeboardControlComponent;
  let fixture: ComponentFixture<NoticeboardControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeboardControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeboardControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
