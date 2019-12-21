import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyMemberAddComponent } from './family-member-add.component';

describe('FamilyMemberAddComponent', () => {
  let component: FamilyMemberAddComponent;
  let fixture: ComponentFixture<FamilyMemberAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyMemberAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyMemberAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
