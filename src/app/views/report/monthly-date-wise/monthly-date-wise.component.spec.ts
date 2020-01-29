import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDateWiseComponent } from './monthly-date-wise.component';

describe('MonthlyDateWiseComponent', () => {
  let component: MonthlyDateWiseComponent;
  let fixture: ComponentFixture<MonthlyDateWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyDateWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyDateWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
