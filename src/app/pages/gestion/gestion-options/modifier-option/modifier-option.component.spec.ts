import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { ModifierOptionComponent } from './modifier-option.component';
import {HttpClientModule} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef, MatIconModule, MatInputModule} from '@angular/material';
import {OptionService} from '../../../../services/option.service';
import {OptionServiceMock} from '../../../../mocks/Option.Service.mock';
import {Component, CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {Option} from '../../../../services/entites/option.model';
import {OverlayContainer} from '@angular/cdk/overlay';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';

describe('ModifierOptionComponent', () => {
  let dialog: MatDialog;
  let dialogRef: MatDialogRef<ModifierOptionComponent>;
  let overlayContainerElement: HTMLElement;
  let noop: ComponentFixture<NoopComponent>;
  let option;


  function  getOption(): Observable<Option> {
    return   Observable.of (
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
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ DialogTestModule, HttpClientModule, MatInputModule ],
      providers: [
        FormBuilder,
        { provide: OverlayContainer, useFactory: () => {
            overlayContainerElement = document.createElement('div');
            return { getContainerElement: () => overlayContainerElement };
          }},
        {provide: OptionService, useClass: OptionServiceMock}
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    });
  });



  beforeEach(() => {
    dialog = TestBed.get(MatDialog);
    getOption().subscribe(res => {
      option = res as Option;
    });
    noop = TestBed.createComponent(NoopComponent);
    dialogRef = dialog.open(ModifierOptionComponent);
    dialogRef.componentInstance.setData(option);
    noop.detectChanges();
  });

  /**
   * Modifier le champs Nom
   */
  function remplirForm(nom) {
    dialogRef.componentInstance.formulaire.controls.nom.setValue(nom);
  }

  it('should create', () => {
    expect(dialogRef.componentInstance).toBeTruthy();
  });

  /**
   * Tester que le formulaire est initialisé avec les infos de l'option
   */
  it('Le formulaire doit être initialisé', () => {
    expect(dialogRef.componentInstance.formulaire.controls.code = option.codeOption);
    expect(dialogRef.componentInstance.formulaire.controls.nom = option.codeOption);

  });


  /**
   * Tester que le formulaire est valide si le nom n'est pas vide
   */
  it('Le formulaire doit être valide si le nom n\'est pas vide', () => {
   remplirForm('toit ouvrant');
   noop.detectChanges();
   noop.whenStable().then( () => {
     expect(dialogRef.componentInstance.formValid).toBeTruthy();
    });
  });
  /**
   * Tester que le formulaire est invalide si le nom modifié est vide
   */
  it('Le formulaire doit être invalide si le nom entré est null', () => {
    remplirForm('');
    noop.detectChanges();
    noop.whenStable().then( () => {
      expect(dialogRef.componentInstance.formValid).toBeFalsy();
    });
  });

  /**
   * Tester que le formulaire est valide si le nom entré n'est pas vide
   */
  it('Le formulaire doit être valide si le nom entré n\est pas vide', () => {
    remplirForm('toit ouvrant');
    noop.detectChanges();
    noop.whenStable().then( () => {
      expect(dialogRef.componentInstance.formValid).toBeTruthy();
    });
  });


  /**
   * Tester l'envoie de la donnée
   */
  it('Le formulaire doit être valide si le nom entré n\est pas vide', () => {
    remplirForm('toit ouvrant');
    const button = overlayContainerElement.querySelector('button');
    button.click();
    noop.detectChanges();
    noop.whenStable().then( () => {
      expect(dialogRef.componentInstance.modifierOption).toHaveBeenCalled();
    });
  });

});

// Noop component is only a workaround to trigger change detection
@Component({
  template: ''
})
class NoopComponent {}

const TEST_DIRECTIVES = [
  ModifierOptionComponent,
  NoopComponent
];

@NgModule({
  imports: [MatDialogModule, NoopAnimationsModule, MatIconModule, CommonModule,
    FormsModule,
    ReactiveFormsModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [
    ModifierOptionComponent
  ],
})
class DialogTestModule { }
