import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCouleurComponent } from './modifier-couleur.component';

describe('ModifierCouleurComponent', () => {
  let component: ModifierCouleurComponent;
  let fixture: ComponentFixture<ModifierCouleurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierCouleurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierCouleurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
