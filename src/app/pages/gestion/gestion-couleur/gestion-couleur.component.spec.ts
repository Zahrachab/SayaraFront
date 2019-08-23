import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {VersionServiceMock} from '../../../mocks/Version.Service.mock';
import {HttpClientModule} from '@angular/common/http';
import {
  MatDialog,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatTableModule
} from '@angular/material';
import {APP_BASE_HREF} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModeleService} from '../../../services/modele.service';
import {ModeleServiceMock} from '../../../mocks/Modele.Service.mock';
import {OptionService} from '../../../services/option.service';
import {CouleurService} from '../../../services/couleur.service';
import {CouleurServiceMock} from '../../../mocks/Couleur.Service.mock';
import {OptionServiceMock} from '../../../mocks/Option.Service.mock';
import {VersionService} from '../../../services/version.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';
import {GestionCouleurComponent} from './gestion-couleur.component';
import {RouterModule} from '@angular/router';
import {Couleur} from '../../../services/entites/couleur.model';
import {ToastrManager} from 'ng6-toastr-notifications';

fdescribe('GestionCouleursComponent', () => {
  let component: GestionCouleurComponent;
  let fixture: ComponentFixture<GestionCouleurComponent>;
  let spySupprimer: jasmine.Spy;
  let data: Couleur [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatInputModule,
        RouterModule.forRoot([])],
      declarations: [ GestionCouleurComponent ],
      providers: [
        {provide : ModeleService , useClass : ModeleServiceMock},
        {provide : OptionService , useClass : OptionServiceMock},
        {provide : VersionService , useClass : VersionServiceMock},
        {provide : CouleurService , useClass : CouleurServiceMock},
        {provide: MatDialog, useValue: {} },
        {provide: APP_BASE_HREF, useValue : '/' },
        {provide: ToastrManager, useValue: {}}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCouleurComponent);
    component = fixture.componentInstance;
    spySupprimer = spyOn(component, 'supprimerCouleur');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*Tester si le tableau est bien affiché avec des données renvoyées par le service VersionServiceMock */
  it('should test the table ', () => {
    // Le mock du service VersionService
    const couleursService = new CouleurServiceMock();
    // La liste des versions renvoyée par VersionServiceMock
    couleursService.getCouleurs(1).subscribe(res => {
      data = res as Couleur [];
    });
    fixture.detectChanges();
    // tester le clique sur le mat-select
    const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
    trigger.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      // tester le clique sur le premier modèle qui apparait dans le mat-select
      const matOption = fixture.debugElement.queryAll(By.css('.mat-option'));
      fixture.detectChanges();
      matOption[1].nativeElement.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        // tester l'affichage du tableau après le clique sur un modèle donnée
        const tableRows = fixture.nativeElement.querySelectorAll('mat-row');
        fixture.detectChanges();
        // tester le nombre de ligne dans le tableau
        expect(tableRows.length).toBe(data.length);
        // tester les header
        const headerRow = fixture.nativeElement.querySelectorAll('mat-header-cell');
        expect(headerRow[0].innerHTML).toContain('CODE COULEUR');
        expect(headerRow[1].innerHTML).toContain('NOM COULEUR');
        expect(headerRow[2].innerHTML).toContain('COULEUR');
        expect(headerRow[3].innerHTML).toContain('GESTION');
        let i = 0;
        for (const row of data) {
          // tester l'affichage des données sur le tableau
          const row1 = tableRows[i++];
          expect(row1.childNodes[1].innerHTML).toContain(row.CodeCouleur);
          expect(row1.childNodes[2].innerHTML).toContain(row.NomCouleur);
          // tester le code rgb de la couleur à l'intérieur du cercle
          console.log(row1.childNodes[3].innerHTML);
          /*expect(row1.childNodes[3].innerHTML).toContain(hexToRgb(row.CodeHexa).r +
            ', ' + hexToRgb(row.CodeHexa).g + ', ' + hexToRgb(row.CodeHexa).b);*/

        }
      });
    });
  });
  // tester le clique sur le bouton ajouter une nouvelle couleur
  it('should test button ajouter Couleur', async(() => {
    spyOn(component, 'ajouterCouleur');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.ajouterCouleur).toHaveBeenCalled();
    });
  }));

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  /**
   * Tester l'invocation de la méthode suprimerCouleur lors d'un clique sur l'icon supprimer
   **/
  /*
  it('doit supprimer une couleur', () => {

    //le clique sur le mat-select
    const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
    trigger.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      // clique sur le premier modèle qui apparait dans le mat-select
      const matOption = fixture.debugElement.queryAll(By.css('.mat-option'));
      matOption[1].nativeElement.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        // cliquer sur l'icon supprimer de la nouvelle lignew
        const trigger = fixture.debugElement.query(By.css('.supp')).nativeElement;
        trigger.click();
        // tester l'invocation de la méthode supprimer version
        expect(spySupprimer).toHaveBeenCalledWith(data[0],component.getModele());
      });
    });

  });*/
});
