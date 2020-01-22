import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisccustionDialogComponent } from './disccustion-dialog.component';

describe('DisccustionDialogComponent', () => {
  let component: DisccustionDialogComponent;
  let fixture: ComponentFixture<DisccustionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisccustionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisccustionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
