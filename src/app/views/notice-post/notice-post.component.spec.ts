import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticePostComponent } from './notice-post.component';

describe('NoticePostComponent', () => {
  let component: NoticePostComponent;
  let fixture: ComponentFixture<NoticePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
