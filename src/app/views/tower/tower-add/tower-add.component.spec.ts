import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TowerAddComponent } from './tower-add.component';

describe('TowerAddComponent', () => {
  let component: TowerAddComponent;
  let fixture: ComponentFixture<TowerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TowerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TowerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
