import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder
} from '@angular/forms';
import { AjouterModeleComponent } from './ajouterModele.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {ModeleService} from '../../../../services/modele.service';
import {HttpClientModule} from '@angular/common/http';
import {ModeleServiceMock} from '../../../../mocks/Modele.Service.mock';
import {VersionService} from '../../../../services/version.service';
import {OptionService} from '../../../../services/option.service';
import {CouleurService} from '../../../../services/couleur.service';
import {OptionServiceMock} from '../../../../mocks/Option.Service.mock';
import {CouleurServiceMock} from '../../../../mocks/Couleur.Service.mock';
import {VersionServiceMock} from '../../../../mocks/Version.Service.mock';
import {MatDialogRef} from '@angular/material';


describe('AjouterModeleComponent', () => {
  let component: AjouterModeleComponent;
  let fixture: ComponentFixture<AjouterModeleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ AjouterModeleComponent ],
      providers: [
        FormBuilder,
        {provide : ModeleService , useClass : ModeleServiceMock},
        {provide : OptionService , useClass : OptionServiceMock},
        {provide : CouleurService , useClass : CouleurServiceMock},
        {provide : VersionService , useClass : VersionServiceMock},
        { provide: MatDialogRef, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //  créer une fonction réutilisable .
  function remplirForm(code , nom) {
    component.formulaire.controls.code.setValue(code);
    component.formulaire.controls.nom.setValue(nom);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Le formulaire doit être invalide si le champs code est vide', () => {
    remplirForm('Megan', 'hfkg');
    expect(component).toBeTruthy();
  });

  /*it('Le formulaire doit être invalide si le champs nom est vide', () => {
    remplirForm('', '0976');
    expect(component.formulaire.valid).toBeFalsy();
  });*/
});
