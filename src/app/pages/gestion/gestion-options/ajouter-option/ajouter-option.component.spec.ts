import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterOptionComponent } from './ajouter-option.component';

describe('AjouterOptionComponent', () => {
  let component: AjouterOptionComponent;
  let fixture: ComponentFixture<AjouterOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Remplir les champs du formulaire
   */
  function remplirForm(code , nom) {
    component.formulaire.controls.code.setValue(code);
    component.formulaire.controls.nom.setValue(nom);
  }

  /**
   * Tester la validité du form si le champs nom est vide
   */
  it('Le formulaire doit être invalide si le champs nom est vide', () => {
    remplirForm('997', '');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component).toBeFalsy();
    });
  });

  /**
   * Tester la validité du form si le champs code est vide
   */
  it('Le formulaire doit être invalide si le champs code est vide', () => {
    remplirForm('', 'AirBag');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component).toBeFalsy();
    });
  });

  /**
   * Tester la validité du form si les champs sont remplies
   */
  it('Le formulaire doit être valide si aucun champs est vide', () => {
    remplirForm('98765', 'AirBag');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component).toBeTruthy();
    });
  });



});
