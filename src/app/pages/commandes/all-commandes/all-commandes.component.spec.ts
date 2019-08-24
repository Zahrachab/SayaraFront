import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {MatTableModule, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material';
import {AllCommandesComponent} from './all-commandes.component';
import {CommandeServiceMock} from '../../../mocks/commande.Service.mock';
import {CommandeService} from '../../../services/commande.service';
import {Commande} from '../../../services/entites/commande.model';
import {RouterTestingModule} from '@angular/router/testing';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {ToastrManager} from 'ng6-toastr-notifications';
import {ToastManagerMock} from '../../../mocks/ToastManagerMock';




fdescribe('AllCommandesComponent', () => {
  let component: AllCommandesComponent;
  let fixture: ComponentFixture<AllCommandesComponent>;
  let data;

  let dialog: MatDialog;
  let dialogRef : MatDialogRef<ConfirmationDialogComponent>;
  let spyOpen: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientModule, MatTableModule, MatPaginatorModule, BrowserAnimationsModule, MatMenuModule, RouterTestingModule, MatDialogModule],
      declarations: [ AllCommandesComponent ],
      providers: [
        {provide : CommandeService , useClass : CommandeServiceMock},
        {provide : ToastrManager , useClass : ToastManagerMock}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents().then(() => {

    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialog = TestBed.get(MatDialog);
    spyOpen = spyOn(dialog, 'open');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**Tester si le tableau est bien affiché avec des données renvoyées par le service CommandeService 
   * 
   **/
  it('should test the table ', () => {
    const mockService = new CommandeServiceMock();
    // La liste des commandes renvoyées par le mocked service
    mockService.getAllCommandes().subscribe(res => {
      data = res as Commande[];
    });
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const tableRows = fixture.nativeElement.querySelectorAll('mat-row');
      expect(tableRows.length).toBe(data.length);

      // tester le header du tableau
      const headerRow = fixture.nativeElement.querySelectorAll('mat-header-cell');
      expect(headerRow[0].innerHTML).toContain('DATE');
      expect(headerRow[1].innerHTML).toContain('CLIENT');
      expect(headerRow[2].innerHTML).toContain('VEHICULE');
      expect(headerRow[3].innerHTML).toContain('PRIX');
      expect(headerRow[4].innerHTML).toContain('RESERVATION');
      expect(headerRow[5].innerHTML).toContain('GESTION');

      let i = 0;
      for (const row of data) {
        // tester l'affichage des données sur le tableau
        const rowMatTable = tableRows[i++];
        expect(rowMatTable.childNodes[1].innerHTML).toContain(row.Date.substring(0,10));
        expect(rowMatTable.childNodes[2].innerHTML).toContain(row.automobiliste.Prenom);
        expect(rowMatTable.childNodes[2].innerHTML).toContain(row.automobiliste.Nom);
        expect(rowMatTable.childNodes[2].innerHTML).toContain(row.automobiliste.NumTel);
        expect(rowMatTable.childNodes[3].innerHTML).toContain(row.vehicule.NomModele);
        expect(rowMatTable.childNodes[3].innerHTML).toContain(row.vehicule.NomVersion);
        expect(rowMatTable.childNodes[3].innerHTML).toContain(row.vehicule.NumChassis);
        expect(rowMatTable.childNodes[4].innerHTML).toContain(row.Montant);
        if( row.Reservation == null) {
          expect(rowMatTable.childNodes[5].innerHTML).toContain("Aucune");
        } else {
          expect(rowMatTable.childNodes[5].innerHTML).toContain(row.Reservation);
        }

        if(row.Etat == 0) {
          console.log(rowMatTable.childNodes[6]);
          expect(rowMatTable.childNodes[6].textContent).toContain('Accepter');
          expect(rowMatTable.childNodes[6].textContent).toContain("Refuser");
        } else if (row.Etat == 1) {
          expect(rowMatTable.childNodes[6].textContent).toContain("Annulée");
        } else if (row.Etat ==2) {
          expect(rowMatTable.childNodes[6].textContent).toContain("Refusée");
        } else if (row.Etat == 3) {
          expect(rowMatTable.childNodes[6].textContent).toContain("Acceptée");
        }

      }

    });
  });


  it('should test button valider commande', async(() => {
    spyOn(component, 'validerCommande');
    const button = fixture.nativeElement.querySelector('.accepter');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.validerCommande).toHaveBeenCalled();
    });
  }));


  it('should test button refuser commande', async(() => {
    spyOn(component, 'rejeterCommande');
    const button = fixture.nativeElement.querySelector('.refuser');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.rejeterCommande).toHaveBeenCalled();
    });
  }));



});
