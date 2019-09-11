import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {MatTableModule, MatDialog} from '@angular/material';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {GestionModeleComponent} from './gestion-modele.component';
import {HttpClientModule} from '@angular/common/http';
import {ModeleService} from '../../../services/modele.service';
import {ModeleServiceMock} from '../../../mocks/Modele.Service.mock';
import {OptionService} from '../../../services/option.service';
import {OptionServiceMock} from '../../../mocks/Option.Service.mock';
import {CouleurService} from '../../../services/couleur.service';
import {CouleurServiceMock} from '../../../mocks/Couleur.Service.mock';
import {VersionService} from '../../../services/version.service';
import {VersionServiceMock} from '../../../mocks/Version.Service.mock';
import {MatPaginatorModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material';
import {ModeleDetail} from '../../../services/entites/modeleDetail.model';
import {ToastrManager} from 'ng6-toastr-notifications';
import {ToastManagerMock} from '../../../mocks/ToastManagerMock';
import {PusherService} from '../../../services/pusher.service';
import {PusherServiceMock} from '../../../mocks/Pusher.Service.mock';




fdescribe('GestionModeleComponent', () => {
  let component: GestionModeleComponent;
  let fixture: ComponentFixture<GestionModeleComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientModule, MatTableModule, MatPaginatorModule, BrowserAnimationsModule, MatMenuModule],
      declarations: [ GestionModeleComponent ],
      providers: [
        {provide : ModeleService , useClass : ModeleServiceMock},
        {provide : OptionService , useClass : OptionServiceMock},
        {provide : CouleurService , useClass : CouleurServiceMock},
        {provide : VersionService , useClass : VersionServiceMock},
        {provide: PusherService, useClass: PusherServiceMock},
        {provide: ToastrManager, useClass: ToastManagerMock},
        {provide: MatDialog, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents().then(() => {

    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*Tester si le tableau est bien affiché avec des données renvoyées par le service ModelService */
  it('should test the table ', () => {
    // Le mock du service ModelService
    let modelesData;
    const modelService = new ModeleServiceMock();
    // La liste des modèles renvoyée par ModelesServicesMock
    modelService.getModeles().subscribe(res => {
      modelesData = res as ModeleDetail[];
    });
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const tableRows = fixture.nativeElement.querySelectorAll('mat-row');
      expect(tableRows.length).toBe(modelesData.length);

      // Header row
      const headerRow = fixture.nativeElement.querySelectorAll('mat-header-cell');
      expect(headerRow[0].innerHTML).toContain('CODE');
      expect(headerRow[1].innerHTML).toContain('MODELE');
      expect(headerRow[2].innerHTML).toContain('VERSIONS');
      expect(headerRow[3].innerHTML).toContain('OPTIONS');
      expect(headerRow[4].innerHTML).toContain('COULEURS');
      expect(headerRow[5].innerHTML).toContain('GESTION');


      // tester l'affichage des données sur le tableau
      const row1 = tableRows[0];
      expect(row1.childNodes[1].innerHTML).toContain(modelesData[0].CodeModele);
      expect(row1.childNodes[2].innerHTML).toContain(modelesData[0].NomModele);
      // Tester que les versions d'un modèle sont bien affichés
      for (const version of modelesData[0].versions) {
        expect(row1.childNodes[3].innerHTML).toContain(version.NomVersion);
      }

      // Tester que les  options d'un modèle sont bien affichés
      for (const option of modelesData[0].options) {
        expect(row1.childNodes[4].innerHTML).toContain(option.NomOption);
      }

      // Tester que les couleurs d'un modèle sont bien affichés
      for (const couleur of modelesData[0].couleurs) {
        expect(row1.childNodes[5].innerHTML).toContain(couleur.NomCouleur);
      }

    });
  });


  it('should test button ajouter Modèle', async(() => {
    spyOn(component, 'ajouterModele');

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.ajouterModele).toHaveBeenCalled();
    });
  }));



});
