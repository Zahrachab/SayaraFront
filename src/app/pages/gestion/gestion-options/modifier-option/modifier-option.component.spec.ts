import { ComponentFixture, TestBed } from '@angular/core/testing';

import {Component, CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {OptionService} from '../../../../services/option.service';
import {HttpClientModule} from '@angular/common/http';
import {MatDialog, MatDialogModule, MatDialogRef, MatIconModule, MatInputModule} from '@angular/material';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OptionServiceMock} from '../../../../mocks/Option.Service.mock';
import {OverlayContainer} from '@angular/cdk/overlay'
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {ModifierOptionComponent} from './modifier-option.component';
import {Observable} from 'rxjs';
import {Option} from '../../../../services/entites/option.model';

describe('ModifierOptionComponent', () => {
  let dialog: MatDialog;
  let dialogRef: MatDialogRef<ModifierOptionComponent>;
  let overlayContainerElement: HTMLElement;
  let noop: ComponentFixture<NoopComponent>;

  // spy for mat dialog
  let dialogSpyOpen: jasmine.Spy;
  let dialogSpyClose: jasmine.Spy;
  let dialogSpyAjouter: jasmine.Spy;

  let option: Option;
  function getOption(): Observable<Option> {
    return  Observable.of(
      {
        CodeOption: '10',
        NomOption: 'radar avant',
        rel_ver_opt: {
          idRelVerOpt: '',
          CodeVersion: '',
          CodeOption: '',
        },
        Checked: true
      });
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



  beforeEach( () => {
    dialog = TestBed.get(MatDialog);
    noop = TestBed.createComponent(NoopComponent);
    dialogRef = dialog.open(ModifierOptionComponent);
    dialogSpyOpen = spyOn(dialog, 'open');
    dialogSpyClose = spyOn(dialogRef, 'close');
    dialogSpyAjouter = spyOn(dialogRef.componentInstance, 'modifierOption');
    getOption().subscribe((res) => {option = res as Option; });
    dialogRef.componentInstance.option = option;
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
   * Tester que le formulaire est invalide si le nom  est vide
   */
  it('Le formulaire doit être invalide si le nom est vide', () => {
    remplirForm('');
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
    remplirForm('toit ouvrant');
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
