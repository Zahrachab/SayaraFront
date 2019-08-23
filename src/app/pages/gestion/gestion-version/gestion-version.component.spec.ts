import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionVersionComponent } from './gestion-version.component';
import {VersionServiceMock} from '../../../mocks/Version.Service.mock';
import {VersionDetail} from '../../../services/entites/versionDetail.model';
import {HttpClientModule} from '@angular/common/http';
import {MatMenuModule} from '@angular/material';
import {
  MatDialog,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatTableModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModeleService} from '../../../services/modele.service';
import {ModeleServiceMock} from '../../../mocks/Modele.Service.mock';
import {OptionService} from '../../../services/option.service';
import {OptionServiceMock} from '../../../mocks/Option.Service.mock';
import {CouleurService} from '../../../services/couleur.service';
import {CouleurServiceMock} from '../../../mocks/Couleur.Service.mock';
import {RouterTestingModule} from '@angular/router/testing';
import {VersionService} from '../../../services/version.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ToastrManager} from 'ng6-toastr-notifications';

describe('GestionVersionComponent', () => {
  let component: GestionVersionComponent;
  let fixture: ComponentFixture<GestionVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatTableModule, MatPaginatorModule, RouterTestingModule, BrowserAnimationsModule, MatMenuModule, MatSelectModule, MatInputModule],
      declarations: [ GestionVersionComponent ],
      providers: [
        {provide : ModeleService , useClass : ModeleServiceMock},
        {provide : OptionService , useClass : OptionServiceMock},
        {provide : CouleurService , useClass : CouleurServiceMock},
        {provide : VersionService , useClass : VersionServiceMock},
        {provide: MatDialog, useValue: {} },
        {provide: ToastrManager, useValue: {}}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*Tester si le tableau est bien affiché avec des données renvoyées par le service VersionServiceMock */
  it('should test the table ', () => {
    // Le mock du service VersionService
    const versionService = new VersionServiceMock();
    // La liste des versions renvoyée par VersionServiceMock
    let data: VersionDetail[];
    versionService.getVersions(1).subscribe(res => {
      data = res as VersionDetail[];
    });
    fixture.detectChanges();
    // tester le clique sur le mat-select
    const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
    trigger.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      // tester le clique sur le premier modèle qui apparait dans le mat-select
      const matOption = fixture.debugElement.queryAll(By.css('.mat-option'));
      matOption[1].nativeElement.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        // tester l'affichage du tableau après le clique sur un modèle donnée
        const tableRows = fixture.nativeElement.querySelectorAll('mat-row');
        // tester le nombre de ligne dans le tableau
        expect(tableRows.length).toBe(data.length);
        // tester les header
        const headerRow = fixture.nativeElement.querySelectorAll('mat-header-cell');
        expect(headerRow[0].innerHTML).toContain('CODE');
        expect(headerRow[1].innerHTML).toContain('VERSION');
        expect(headerRow[2].innerHTML).toContain('MODELE');
        expect(headerRow[3].innerHTML).toContain('OPTIONS');
        expect(headerRow[4].innerHTML).toContain('GESTION');
        let i = 0;
        for (const row of data) {
          // tester l'affichage des données sur le tableau
          const row1 = tableRows[i++];
          expect(row1.childNodes[1].innerHTML).toContain(row.CodeVersion);
          expect(row1.childNodes[2].innerHTML).toContain(row.NomVersion);
          expect(row1.childNodes[3].innerHTML).toContain(row.CodeModele);
          // Tester que les versions d'un modèle sont bien affichés
          for (const option of row.options) {
            expect(row1.childNodes[4].innerHTML).toContain(option.NomOption);
          }
        }
      });
    });
  });

  // tester le clique sur le bouton ajouter une nouvelle version
  it('should test button ajouter Version', async(() => {
    spyOn(component, 'ajouterVersion');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.ajouterVersion).toHaveBeenCalled();
    });
  }));
});
