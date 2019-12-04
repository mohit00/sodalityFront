import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyAddComponent } from './society-add.component';

describe('SocietyAddComponent', () => {
  let component: SocietyAddComponent;
  let fixture: ComponentFixture<SocietyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocietyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
