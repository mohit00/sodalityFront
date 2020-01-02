import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyComplainComponent } from './society-complain.component';

describe('SocietyComplainComponent', () => {
  let component: SocietyComplainComponent;
  let fixture: ComponentFixture<SocietyComplainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocietyComplainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietyComplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
