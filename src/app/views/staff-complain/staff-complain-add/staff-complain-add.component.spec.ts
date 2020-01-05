import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffComplainAddComponent } from './staff-complain-add.component';

describe('StaffComplainAddComponent', () => {
  let component: StaffComplainAddComponent;
  let fixture: ComponentFixture<StaffComplainAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffComplainAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffComplainAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
