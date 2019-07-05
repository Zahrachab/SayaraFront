import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/table';
import {Observable, of} from 'rxjs';
import {Stock} from '../../../services/entites/stock.modele';
import {Commande} from '../../../services/entites/commande.model';


const data: Commande[] = [
  {
    Date: '12/12/2018',
    Client: {
      NomClient: 'Chabane Zahra',
      WilayaClient: 'Alger',
      NumClient: '0543 76 87 98',
    },
    NomModele: 'Golf',
    NomVersion: 'Série 6',
    Prix: 1500000,
    Reserve: true,
    PrixPaye: 12000,
    Accepte: true,
    Refuse: false,
  },
  {
    Date: '12/12/2018',
    Client: {
      NomClient: 'Chabane Zahra',
      WilayaClient: 'Alger',
      NumClient: '0543 76 87 98',
    },
    NomModele: 'Golf',
    NomVersion: 'Série 6',
    Prix: 1500000,
    Reserve: false,
    PrixPaye: 0,
    Accepte: true,
    Refuse: false,
  }
];
@Component({
  selector: 'app-all-commandes',
  templateUrl: './all-commandes.component.html',
  styleUrls: ['./all-commandes.component.scss']
})
export class AllCommandesComponent implements OnInit {
  dataSource = new ExampleDataSource();
  displayedColumns = ['Date', 'Client', 'Vehicule', 'Prix', 'Reservation', 'gestion'];

  constructor() { }

  ngOnInit() {
  }

}

export class ExampleDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Stock[]> {
    const rows = [];
    data.forEach(element => rows.push(element));
    return of(rows);
  }

  disconnect() { }
}
