import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyFlatWiseComponent } from './daily-flat-wise.component';

describe('DailyFlatWiseComponent', () => {
  let component: DailyFlatWiseComponent;
  let fixture: ComponentFixture<DailyFlatWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyFlatWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyFlatWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
