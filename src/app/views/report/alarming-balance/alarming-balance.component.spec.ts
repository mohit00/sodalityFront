import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmingBalanceComponent } from './alarming-balance.component';

describe('AlarmingBalanceComponent', () => {
  let component: AlarmingBalanceComponent;
  let fixture: ComponentFixture<AlarmingBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmingBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmingBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
