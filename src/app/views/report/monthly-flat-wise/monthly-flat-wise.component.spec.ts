import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyFlatWiseComponent } from './monthly-flat-wise.component';

describe('MonthlyFlatWiseComponent', () => {
  let component: MonthlyFlatWiseComponent;
  let fixture: ComponentFixture<MonthlyFlatWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyFlatWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyFlatWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
