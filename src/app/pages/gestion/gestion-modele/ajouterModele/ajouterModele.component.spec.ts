import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder, FormsModule, ReactiveFormsModule
} from '@angular/forms';
import { AjouterModeleComponent } from './ajouterModele.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {OptionService} from '../../../../services/option.service';
import {OptionServiceMock} from '../../../../mocks/Option.Service.mock';
import {MatCheckboxModule, MatDialog, MatDialogModule, MatDialogRef, MatIconModule, MatInputModule} from '@angular/material';
import {OverlayContainer} from '@angular/cdk/overlay';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../../../material.module';
import {ColorPickerModule} from 'ngx-color-picker';
import {ModeleService} from '../../../../services/modele.service';
import {ModeleServiceMock} from '../../../../mocks/Modele.Service.mock';
import {CouleurServiceMock} from '../../../../mocks/Couleur.Service.mock';
import {CouleurService} from '../../../../services/couleur.service';



fdescribe('AjouterModeleComponent', () => {
  let component: AjouterModeleComponent;

  let dialog: MatDialog;
  let dialogRef: MatDialogRef<AjouterModeleComponent>;
  let overlayContainerElement: HTMLElement;
  let noop: ComponentFixture<NoopComponent>;

  // spy for mat dialog
  let dialogSpyOpen: jasmine.Spy;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogTestModule, HttpClientModule, MatInputModule, MaterialModule,ColorPickerModule],
      providers: [
        FormBuilder,
        {
          provide: OverlayContainer, useFactory: () => {
            overlayContainerElement = document.createElement('div');
            return {getContainerElement: () => overlayContainerElement};
          }
        },
        {provide: ModeleService, useClass: ModeleServiceMock},
        {provide: CouleurService, useClass: CouleurServiceMock},
        {provide: OptionService, useClass: OptionServiceMock}
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    });
  });


  beforeEach(() => {
    dialog = TestBed.get(MatDialog);
    noop = TestBed.createComponent(NoopComponent);
    dialogRef = dialog.open(AjouterModeleComponent);
    dialogSpyOpen = spyOn(dialog, 'open');
    noop.detectChanges();
  });


  //  créer une fonction réutilisable .
  function remplirForm(code, nom) {
    dialogRef.componentInstance.formulaire.controls.code.setValue(code);
    dialogRef.componentInstance.formulaire.controls.nom.setValue(nom);
  }

  it('should create', () => {
    expect(dialogRef.componentInstance).toBeTruthy();
  });


  it('Le formulaire doit être invalide si le champs code est vide', () => {
    remplirForm('', 'renault');
    noop.detectChanges();
    noop.whenStable().then(() => {
      expect(dialogRef.componentInstance.formulaire.valid).toBeFalsy();
    });
  });

  it('Le formulaire doit être invalide si le champs nom est vide', () => {
    remplirForm('8765', '');
    noop.detectChanges();
    noop.whenStable().then(() => {
      expect(dialogRef.componentInstance.formulaire.valid).toBeFalsy();
    });
  });

  it('Le formulaire doit être valide si les champs code eet nom ne sont pas vides', () => {
    remplirForm('09876', 'renault');
    noop.detectChanges();
    noop.whenStable().then(() => {
      expect(dialogRef.componentInstance.formulaire.valid).toBeTruthy();
    });
  });


});
// Noop component is only a workaround to trigger change detection
@Component({
  template: ''
})
class NoopComponent {}

const TEST_DIRECTIVES = [
  AjouterModeleComponent,
  NoopComponent
];

@NgModule({
  imports: [MatDialogModule, NoopAnimationsModule, MatIconModule, CommonModule,ColorPickerModule,
    FormsModule,
    ReactiveFormsModule, MaterialModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [
    AjouterModeleComponent
  ],
})
class DialogTestModule {};
