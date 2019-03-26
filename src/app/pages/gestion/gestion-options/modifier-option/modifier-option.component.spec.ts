import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierOptionComponent } from './modifier-option.component';

describe('ModifierOptionComponent', () => {
  let component: ModifierOptionComponent;
  let fixture: ComponentFixture<ModifierOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
