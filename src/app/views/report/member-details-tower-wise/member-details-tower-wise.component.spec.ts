import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailsTowerWiseComponent } from './member-details-tower-wise.component';

describe('MemberDetailsTowerWiseComponent', () => {
  let component: MemberDetailsTowerWiseComponent;
  let fixture: ComponentFixture<MemberDetailsTowerWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberDetailsTowerWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailsTowerWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
