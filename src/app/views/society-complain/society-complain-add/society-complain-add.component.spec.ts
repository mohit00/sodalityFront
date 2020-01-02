import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyComplainAddComponent } from './society-complain-add.component';

describe('SocietyComplainAddComponent', () => {
  let component: SocietyComplainAddComponent;
  let fixture: ComponentFixture<SocietyComplainAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocietyComplainAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietyComplainAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
