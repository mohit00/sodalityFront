import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatDebitCreditComponent } from './flat-debit-credit.component';

describe('FlatDebitCreditComponent', () => {
  let component: FlatDebitCreditComponent;
  let fixture: ComponentFixture<FlatDebitCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatDebitCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatDebitCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
