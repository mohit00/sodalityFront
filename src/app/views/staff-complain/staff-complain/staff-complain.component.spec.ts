import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffComplainComponent } from './staff-complain.component';

describe('StaffComplainComponent', () => {
  let component: StaffComplainComponent;
  let fixture: ComponentFixture<StaffComplainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffComplainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffComplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
