import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheModeleComponent } from './fiche-modele.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {ModifierModeleComponent} from '../modifier-modele/modifier-modele.component';
import {MatDialog, MatDialogModule, MatDialogRef, MatIconModule, MatInputModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../../../../material.module';
import {ColorPickerModule} from 'ngx-color-picker';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OverlayContainer} from '@angular/cdk/overlay';
import {ModeleService} from '../../../../services/modele.service';
import {ModeleServiceMock} from '../../../../mocks/Modele.Service.mock';
import {CouleurService} from '../../../../services/couleur.service';
import {CouleurServiceMock} from '../../../../mocks/Couleur.Service.mock';
import {OptionService} from '../../../../services/option.service';
import {OptionServiceMock} from '../../../../mocks/Option.Service.mock';
import {ToastrManager} from 'ng6-toastr-notifications';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';

fdescribe('FicheModeleComponent', () => {

  let component: FicheModeleComponent;

  let dialog: MatDialog;
  let dialogRef: MatDialogRef<FicheModeleComponent>;
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
        {provide: OptionService, useClass: OptionServiceMock},
        {provide: ToastrManager, useValue: {}}
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    });
  });


  beforeEach(() => {
    dialog = TestBed.get(MatDialog);
    noop = TestBed.createComponent(NoopComponent);
    dialogRef = dialog.open(FicheModeleComponent);
    dialogSpyOpen = spyOn(dialog, 'open');
    noop.detectChanges();
  });




  it('should create', () => {
    expect(dialogRef.componentInstance).toBeTruthy();
  });

});
// Noop component is only a workaround to trigger change detection
@Component({
  template: ''
})
class NoopComponent {}

const TEST_DIRECTIVES = [
  FicheModeleComponent,
  NoopComponent
];

@NgModule({
  imports: [MatDialogModule, NoopAnimationsModule, MatIconModule, CommonModule,ColorPickerModule,
    FormsModule,
    ReactiveFormsModule, MaterialModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [
    FicheModeleComponent
  ],
})
class DialogTestModule {};
