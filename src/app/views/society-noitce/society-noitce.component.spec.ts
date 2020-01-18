import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyNoitceComponent } from './society-noitce.component';

describe('SocietyNoitceComponent', () => {
  let component: SocietyNoitceComponent;
  let fixture: ComponentFixture<SocietyNoitceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocietyNoitceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietyNoitceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
