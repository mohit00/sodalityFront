import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponRequestComponent } from './coupon-request.component';

describe('CouponRequestComponent', () => {
  let component: CouponRequestComponent;
  let fixture: ComponentFixture<CouponRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
