import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierVerionComponent } from './modifier-verion.component';

describe('ModifierVerionComponent', () => {
  let component: ModifierVerionComponent;
  let fixture: ComponentFixture<ModifierVerionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierVerionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierVerionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
