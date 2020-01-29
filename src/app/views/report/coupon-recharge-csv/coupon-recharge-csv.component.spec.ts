import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponRechargeCsvComponent } from './coupon-recharge-csv.component';

describe('CouponRechargeCsvComponent', () => {
  let component: CouponRechargeCsvComponent;
  let fixture: ComponentFixture<CouponRechargeCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponRechargeCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponRechargeCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
