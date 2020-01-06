import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyDashboardComponent } from './society-dashboard.component';

describe('SocietyDashboardComponent', () => {
  let component: SocietyDashboardComponent;
  let fixture: ComponentFixture<SocietyDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocietyDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
