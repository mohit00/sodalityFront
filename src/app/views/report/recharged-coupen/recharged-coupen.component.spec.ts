import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargedCoupenComponent } from './recharged-coupen.component';

describe('RechargedCoupenComponent', () => {
  let component: RechargedCoupenComponent;
  let fixture: ComponentFixture<RechargedCoupenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechargedCoupenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargedCoupenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
