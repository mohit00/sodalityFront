import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDataFlatWiseCsvComponent } from './monthly-data-flat-wise-csv.component';

describe('MonthlyDataFlatWiseCsvComponent', () => {
  let component: MonthlyDataFlatWiseCsvComponent;
  let fixture: ComponentFixture<MonthlyDataFlatWiseCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyDataFlatWiseCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyDataFlatWiseCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
