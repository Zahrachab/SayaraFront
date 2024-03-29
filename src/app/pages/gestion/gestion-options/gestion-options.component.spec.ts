import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {VersionServiceMock} from '../../../mocks/Version.Service.mock';
import {HttpClientModule} from '@angular/common/http';
import {
  MatDialog, MatDialogRef,
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
import {GestionOptionsComponent} from './gestion-options.component';
import {RouterModule} from '@angular/router';
import {Option} from '../../../services/entites/option.model';
import {ToastrManager} from 'ng6-toastr-notifications';
import {ToastManagerMock} from '../../../mocks/ToastManagerMock';

fdescribe('GestionOptionsComponent', () => {
  let component: GestionOptionsComponent;
  let fixture: ComponentFixture<GestionOptionsComponent>;


  let dialogSpySupprimer: jasmine.Spy;

  let data: Option[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatInputModule,
        RouterModule.forRoot([])],
      declarations: [GestionOptionsComponent],
      providers: [
        {provide: ModeleService, useClass: ModeleServiceMock},
        {provide: OptionService, useClass: OptionServiceMock},
        {provide: VersionService, useClass: VersionServiceMock},
        {provide: CouleurService, useClass: CouleurServiceMock},
        {provide: MatDialog, useValue: {}},
        {provide: ToastrManager, useClass: ToastManagerMock},
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionOptionsComponent);
    component = fixture.componentInstance;
    dialogSpySupprimer = spyOn(component, 'supprimerOption');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Tester si le tableau est bien affiché avec des données renvoyées par le service OptionServiceMock
   **/
  it('should test the table ', () => {
    // Le mock du service OptionService
    const optionsService = new OptionServiceMock();
    // La liste des options renvoyée par OptionServiceMock
    optionsService.getOptions(1).subscribe(res => {
      data = res as Option[];
    });

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
        expect(headerRow[1].innerHTML).toContain('Nom de l\'option');
        expect(headerRow[2].innerHTML).toContain('GESTION');
        let i = 0;
        for (const row of data) {
          // tester l'affichage des données sur le tableau
          const row1 = tableRows[i++];
          expect(row1.childNodes[1].innerHTML).toContain(row.CodeOption);
          expect(row1.childNodes[2].innerHTML).toContain(row.NomOption);
        }
      });
    });
  });


  /**
   * tester le clique sur le bouton ajouter une nouvelle version
   **/
  it('should test button ajouter Option', async(() => {
    spyOn(component, 'ajouterOption');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.ajouterOption).toHaveBeenCalled();
    });
  }));


  /**
   * Tester l'invocation de la méthode suprimerOption lors d'un clique sur l'icon supprimer
   **/

  it('doit supprimer une option', () => {

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
        // cliquer sur l'icon supprimer de la nouvelle ligne
        const trigger = fixture.debugElement.query(By.css('.supp')).nativeElement;
        trigger.click();
        // tester l'invocation de la méthode supprimer option
        expect(dialogSpySupprimer).toHaveBeenCalled();
      });
    });

  });

});
