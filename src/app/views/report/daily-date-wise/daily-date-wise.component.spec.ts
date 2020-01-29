import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyDateWiseComponent } from './daily-date-wise.component';

describe('DailyDateWiseComponent', () => {
  let component: DailyDateWiseComponent;
  let fixture: ComponentFixture<DailyDateWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyDateWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyDateWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
