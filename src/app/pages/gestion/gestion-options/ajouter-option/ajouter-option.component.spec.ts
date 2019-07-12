import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterOptionComponent } from './ajouter-option.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {OptionService} from '../../../../services/option.service';
import {HttpClientModule} from '@angular/common/http';
import {MatDialog, MatDialogModule, MatDialogRef, MatIconModule, MatInputModule} from '@angular/material';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OptionServiceMock} from '../../../../mocks/Option.Service.mock';
import {OverlayContainer} from '@angular/cdk/overlay';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';

describe('AjouterOptionComponent', () => {
  let dialog: MatDialog;
  let dialogRef: MatDialogRef<AjouterOptionComponent>;
  let overlayContainerElement: HTMLElement;
  let noop: ComponentFixture<NoopComponent>;

  // spy for mat dialog
  let dialogSpyOpen: jasmine.Spy;
  let dialogSpyClose: jasmine.Spy;
  let dialogSpyAjouter: jasmine.Spy;

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



  beforeEach( () => {
    dialog = TestBed.get(MatDialog);
    noop = TestBed.createComponent(NoopComponent);
    dialogRef = dialog.open(AjouterOptionComponent);
    dialogSpyOpen = spyOn(dialog, 'open');
    dialogSpyClose = spyOn(dialogRef, 'close');
    dialogSpyAjouter = spyOn(dialogRef.componentInstance, 'ajouterOption');
    dialogRef.componentInstance.modele = '1';
    noop.detectChanges();
  });

  /**
   * Modifier le champs Nom
   */
  function remplirForm(code, nom) {
    dialogRef.componentInstance.formulaire.controls.code.setValue(code);
    dialogRef.componentInstance.formulaire.controls.nom.setValue(nom);
  }

  it('should create', () => {
    expect(dialogRef.componentInstance).toBeTruthy();
  });



  /**
   * Tester que le formulaire est valide si le nom et le code ne sont pas vides
   */
  it('Le formulaire doit être valide si le nom et le code ne sont pas vides', () => {
    remplirForm('123', 'toit ouvrant');
    noop.detectChanges();
    noop.whenStable().then( () => {
      expect(dialogRef.componentInstance.formValid).toBeTruthy();
    });
  });
  /**
   * Tester que le formulaire est invalide si le nom  est vide
   */
  it('Le formulaire doit être invalide si le nom est vide', () => {
    remplirForm('12' , '');
    noop.detectChanges();
    noop.whenStable().then( () => {
      expect(dialogRef.componentInstance.formValid).toBeFalsy();
    });
  });

  /**
   * Tester que le formulaire est invalide si le code est vide
   */
  it('Le formulaire doit être invalide si le code est vide', () => {
    remplirForm('', 'toit ouvrant');
    noop.detectChanges();
    noop.whenStable().then( () => {
      expect(dialogRef.componentInstance.formValid).toBeFalsy();
    });
  });


  /**
   * Tester la fermeture après l'envoi de la donnée
   */
  it('la méthode dialogRef.close  être invoquée si le bouton submit est cliqué avec des données correctes', () => {
    // remplir le formulaire avec des données correctes
    remplirForm('123', 'toit ouvrant');
    const button = overlayContainerElement.querySelector('button');
    button.click();
    noop.detectChanges();
    noop.whenStable().then( () => {
      // Tester la fermeture du dialog
      expect(dialogSpyClose).toHaveBeenCalled();
    });
  });

});

// Noop component is only a workaround to trigger change detection
@Component({
  template: ''
})
class NoopComponent {}

const TEST_DIRECTIVES = [
  AjouterOptionComponent,
  NoopComponent
];

@NgModule({
  imports: [MatDialogModule, NoopAnimationsModule, MatIconModule, CommonModule,
    FormsModule,
    ReactiveFormsModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [
    AjouterOptionComponent
  ],
})
class DialogTestModule { }
