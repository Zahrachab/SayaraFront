import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Observable, of} from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import {Stock} from '../../../../services/entites/stock.modele';




const dataVehicules: Stock[] = [
  {Version: 'Dacia HK51', Nombre: 23, Update: 'updated on 12/02/2019', Vehicules: [
      {NumChassis: 'AZE23344-12', Couleur: '#a69ca6', PrixMin: '12300000', Options: [
        {NomOption: 'Direction assistée '},
          {NomOption: 'Climatisation'},
          {NomOption: 'Ordinateur de bord'},
          {NomOption: 'ABS'},
          {NomOption: 'Air bag fronteux'},
          {NomOption: 'Air bag latéraux'},
          {NomOption: 'Régulateurs de vitesse'},
          {NomOption: 'Comndanation des portes en roulant'},
          {NomOption: 'Lèves vitres électriques'},
          {NomOption: 'Volant agréable en hauteur'},
          {NomOption: 'Siège réglable en hauteur'},
          {NomOption: 'Rétroviseur éléctrique'},
          {NomOption: 'Garde au sol réhaussé'}
        ]
      },
      {NumChassis: 'AZE23344-12', Couleur: '#001c56', PrixMin: '12300000', Options: [
          {NomOption: 'Direction assistée '},
          {NomOption: 'Climatisation'},
          {NomOption: 'Ordinateur de bord'},
          {NomOption: 'ABS'},
          {NomOption: 'Air bag fronteux'},
          {NomOption: 'Air bag latéraux'},
          {NomOption: 'Régulateurs de vitesse'},
          {NomOption: 'Comndanation des portes en roulant'},
          {NomOption: 'Lèves vitres électriques'},
          {NomOption: 'Volant agréable en hauteur'},
          {NomOption: 'Siège réglable en hauteur'},
          {NomOption: 'Rétroviseur éléctrique'},
          {NomOption: 'Garde au sol réhaussé'}
        ]
      }
    ]
  },
  {Version: 'Dacia Duster', Nombre: 50, Update: 'updated on 12/09/2019', Vehicules: [
      {NumChassis: 'AZE23344-12', Couleur: '#a69ca6', PrixMin: '12300000', Options: [
          {NomOption: 'Direction assistée '},
          {NomOption: 'Climatisation'},
          {NomOption: 'Ordinateur de bord'},
          {NomOption: 'ABS'},
          {NomOption: 'Air bag fronteux'},
          {NomOption: 'Air bag latéraux'},
          {NomOption: 'Régulateurs de vitesse'},
          {NomOption: 'Comndanation des portes en roulant'},
          {NomOption: 'Lèves vitres électriques'},
          {NomOption: 'Volant agréable en hauteur'},
          {NomOption: 'Siège réglable en hauteur'},
          {NomOption: 'Rétroviseur éléctrique'},
          {NomOption: 'Garde au sol réhaussé'}
        ]
      },
      {NumChassis: 'AZE23344-12', Couleur: '#001c56', PrixMin: '12300000', Options: [
          {NomOption: 'Direction assistée '},
          {NomOption: 'Climatisation'},
          {NomOption: 'Ordinateur de bord'},
          {NomOption: 'ABS'},
          {NomOption: 'Air bag fronteux'},
          {NomOption: 'Air bag latéraux'},
          {NomOption: 'Régulateurs de vitesse'},
          {NomOption: 'Comndanation des portes en roulant'},
          {NomOption: 'Lèves vitres électriques'},
          {NomOption: 'Volant agréable en hauteur'},
          {NomOption: 'Siège réglable en hauteur'},
          {NomOption: 'Rétroviseur éléctrique'},
          {NomOption: 'Garde au sol réhaussé'}
        ]
      }
    ]
  }
];


@Component({
  selector: 'app-stock-vehicules',
  templateUrl: './stock-vehicules.component.html',
  styleUrls: ['./stock-vehicules.component.scss'],
  animations: [
    trigger('detailExpand1', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('detailExpand2', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class StockVehiculesComponent  {
  vehiculesDataSource = new ExampleDataSource();
  columnsToDisplay = ['Version', 'Nombre', 'Update'];
  displayedColumnsVehicules = ['NumChassis', 'Couleur', 'PrixMin' , 'détail'];
  expandedElement1: any | null;
  expandedElement2: any | null;

  isExpansionDetailRow = (i: number, row: Object) => {console.log(row.hasOwnProperty('nomOption')); };

}


export class ExampleDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Stock[]> {
    const rows = [];
    dataVehicules.forEach(element => rows.push(element));
    return of(rows);
  }

  disconnect() { }
}


