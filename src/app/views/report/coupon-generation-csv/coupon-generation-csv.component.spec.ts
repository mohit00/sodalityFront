import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponGenerationCsvComponent } from './coupon-generation-csv.component';

describe('CouponGenerationCsvComponent', () => {
  let component: CouponGenerationCsvComponent;
  let fixture: ComponentFixture<CouponGenerationCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponGenerationCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponGenerationCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
