import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDataDateWiseCsvComponent } from './monthly-data-date-wise-csv.component';

describe('MonthlyDataDateWiseCsvComponent', () => {
  let component: MonthlyDataDateWiseCsvComponent;
  let fixture: ComponentFixture<MonthlyDataDateWiseCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyDataDateWiseCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyDataDateWiseCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
