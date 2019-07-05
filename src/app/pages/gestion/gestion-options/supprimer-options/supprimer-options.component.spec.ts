import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerOptionsComponent } from './supprimer-options.component';
import {MAT_DIALOG_DATA, MatButton, MatDialog, MatDialogModule, MatDialogRef, MatIconModule, MatInputModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OverlayContainer} from '@angular/cdk/overlay';
import {OptionService} from '../../../../services/option.service';
import {OptionServiceMock} from '../../../../mocks/Option.Service.mock';
import {Component, CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {Observable, of} from 'rxjs';
import {Option} from '../../../../services/entites/option.model';


describe('SupprimerOptionsComponent', () => {
  let dialog: MatDialog;
  let dialogRef: MatDialogRef<SupprimerOptionsComponent>;
  let overlayContainerElement: HTMLElement;
  let noop: ComponentFixture<NoopComponent>;
  let option: Option;
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
    getOption().subscribe((res) => {
      option = res as Option;
    });
    TestBed.configureTestingModule({
      imports: [ DialogTestModule, HttpClientModule, MatInputModule ],
      providers: [
        FormBuilder,
        { provide: OverlayContainer, useFactory: () => {
            overlayContainerElement = document.createElement('div');
            return { getContainerElement: () => overlayContainerElement };
          }},
        {provide: OptionService, useClass: OptionServiceMock},
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    });
  });



  beforeEach(() => {
    dialog = TestBed.get(MatDialog);
    noop = TestBed.createComponent(NoopComponent);
    dialogRef = dialog.open(SupprimerOptionsComponent);
    noop.detectChanges();
    dialogRef.componentInstance.modele = '1';
    dialogRef.componentInstance.option =  option;

  });


  it('should create', () => {
    expect(dialogRef.componentInstance).toBeTruthy();
  });
  /**
   * Tester la suppression de l'option si on cofirme la suppression
   */
  it('la méthode supprimerOption doit être invoquée si le bouton OUI est cliqué', () => {
      dialogRef.afterOpened().subscribe(() => {
        const button = overlayContainerElement.querySelector('button');
        button.click();
        noop.detectChanges();
        noop.whenStable().then( () => {
          expect(dialogRef.componentInstance.supprimerOption).toHaveBeenCalled();
        });
      });
  });

});


// Noop component is only a workaround to trigger change detection
@Component({
  template: ''
})
class NoopComponent {}

const TEST_DIRECTIVES = [
  SupprimerOptionsComponent,
  NoopComponent
];

@NgModule({
  imports: [MatDialogModule, NoopAnimationsModule, MatIconModule, CommonModule,
    FormsModule,
    ReactiveFormsModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [
    SupprimerOptionsComponent
  ],
})
class DialogTestModule { }
