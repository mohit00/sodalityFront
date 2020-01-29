import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyDataCsvComponent } from './daily-data-csv.component';

describe('DailyDataCsvComponent', () => {
  let component: DailyDataCsvComponent;
  let fixture: ComponentFixture<DailyDataCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyDataCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyDataCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
