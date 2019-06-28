import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierOptionComponent } from './modifier-option.component';
import {HttpClientModule} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatInputModule} from '@angular/material';
import {OptionService} from '../../../../services/option.service';
import {OptionServiceMock} from '../../../../mocks/Option.Service.mock';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {Option} from '../../../../services/entites/option.model';


describe('ModifierOptionComponent', () => {
  let component: ModifierOptionComponent;
  let fixture: ComponentFixture<ModifierOptionComponent>;
  const option: Observable<Option> =  Observable.of (
    {
      CodeOption: '10',
      NomOption: 'radar avant',
      rel_ver_opt: {
        idRelVerOpt: '',
        CodeVersion: '',
        CodeOption: '',
      },
      Checked: true
    }
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierOptionComponent ],
      imports: [HttpClientModule, MatInputModule],
      providers: [
        FormBuilder,
        {provide: MatDialog , useVAlue : {}},
        {provide: MatDialogRef , useVAlue : {}},
        {provide : OptionService , useClass : OptionServiceMock},
        {provide: MAT_DIALOG_DATA, useValue: {data: {option}}}
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierOptionComponent);
    component = fixture.componentInstance;
    component.setData('123', 'nom');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Modifier le champs Nom
   */
  function remplirForm(nom) {
    component.formulaire.controls.nom.setValue(nom);
  }

  /**
   * Tester la validité du form si le champs nom est vide
   */
  it('Le formulaire doit être invalide si le champs nom est vide', () => {
    remplirForm('');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component).toBeFalsy();
    });
  });

  /**
   * Tester la validité du form si le champs nom est rempli
   */
  it('Le formulaire doit être invalide si le champs nom est vide', () => {
    remplirForm('');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component).toBeFalsy();
    });
  });

  /**
   * Tester la validité du form si le champs nom est vide
   */
  it('Le formulaire doit être valide si le champs nom n\'est pas vide', () => {
    remplirForm('AirBag');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component).toBeFalsy();
    });
  });

  /**
   * Tester que le input code est désactivé
   */
  it('le input code doit être désactivé', () => {
    expect(component.formulaire.controls.code.disabled).toBeTruthy();
  });

  /**
   * Tester que le form est initialisé avec les champs de l'option
   */
  it('le form doit être initialisé', () => {
    expect(component.formulaire.controls.code.disabled).toBeTruthy();
  });


});
