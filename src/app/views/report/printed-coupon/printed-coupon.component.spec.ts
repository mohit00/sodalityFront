import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintedCouponComponent } from './printed-coupon.component';

describe('PrintedCouponComponent', () => {
  let component: PrintedCouponComponent;
  let fixture: ComponentFixture<PrintedCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintedCouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintedCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
