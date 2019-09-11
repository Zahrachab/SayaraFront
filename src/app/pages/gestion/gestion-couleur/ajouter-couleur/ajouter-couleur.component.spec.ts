import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder, FormsModule, ReactiveFormsModule
} from '@angular/forms';
import {Component, CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {MatDialog, MatDialogModule, MatDialogRef, MatIconModule, MatInputModule} from '@angular/material';
import {OverlayContainer} from '@angular/cdk/overlay';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../../../material.module';
import {ColorPickerModule} from 'ngx-color-picker';
import {CouleurServiceMock} from '../../../../mocks/Couleur.Service.mock';
import {CouleurService} from '../../../../services/couleur.service';
import {AjouterCouleurComponent} from './ajouter-couleur.component';
import {ToastManagerMock} from '../../../../mocks/ToastManagerMock';
import {ToastrManager} from 'ng6-toastr-notifications';



describe('AjouterCouleurComponent', () => {
  let component: AjouterCouleurComponent;

  let dialog: MatDialog;
  let dialogRef: MatDialogRef<AjouterCouleurComponent>;
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
        {provide: CouleurService, useClass: CouleurServiceMock},
        {provide: ToastrManager, useClass: ToastManagerMock},
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    });
  });


  beforeEach(() => {
    dialog = TestBed.get(MatDialog);
    noop = TestBed.createComponent(NoopComponent);
    dialogRef = dialog.open(AjouterCouleurComponent);
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
  AjouterCouleurComponent,
  NoopComponent
];

@NgModule({
  imports: [MatDialogModule, NoopAnimationsModule, MatIconModule, CommonModule,ColorPickerModule,
    FormsModule,
    ReactiveFormsModule, MaterialModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [
    AjouterCouleurComponent
  ],
})
class DialogTestModule {};
