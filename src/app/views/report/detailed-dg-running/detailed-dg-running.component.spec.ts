import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedDgRunningComponent } from './detailed-dg-running.component';

describe('DetailedDgRunningComponent', () => {
  let component: DetailedDgRunningComponent;
  let fixture: ComponentFixture<DetailedDgRunningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedDgRunningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedDgRunningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
