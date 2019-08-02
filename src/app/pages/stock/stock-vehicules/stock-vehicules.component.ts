import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Observable, of} from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import {StockVersion} from '../../../services/entites/stock.modele';
import {ModeleDetail} from '../../../services/entites/modeleDetail.model';
import {VersionService} from '../../../services/version.service';
import {ModeleService} from '../../../services/modele.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material';
import {StockService} from '../../../services/stock.service';
import {VersionDetail} from '../../../services/entites/versionDetail.model';
import {forEach} from '@angular/router/src/utils/collection';
import {modalConfigDefaults} from 'angular-bootstrap-md/lib/modals/modal.options';
import {StockVehicule} from '../../../services/entites/stockVehicule.model';



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
  ]
})
export class StockVehiculesComponent implements  OnInit{
  // Les modeles pour le mat-select
  private modeles: ModeleDetail[];
  //modele choisi
  private modeleChoisi : ModeleDetail = null;
  //stock d'un modèle
  columnsToDisplay = ['NomVersion', 'Nombre', 'Update'];
  displayedColumnsVehicules = ['NumChassis', 'Couleur', 'Montant' , 'détail'];
  stockDataSource: StockDataSource = new StockDataSource(this.modeleChoisi, this.stockService, this.modeleService);
  expandedElement1: any | null;
  expandedElement2: any | null;
  isExpansionDetailRow = (i: number, row: object) => (1 === 1) ;
  constructor(private versionService: VersionService,
              private modeleService: ModeleService,
              private stockService: StockService) {
  }
  ngOnInit(): void {
    this.modeleService.getModeles().subscribe(res=> {
      this.modeles = res as ModeleDetail[];
    });
  }
  choisirModele($event) {
    console.log($event.value);
    this.modeleChoisi = this.modeles.find(m => m.CodeModele == $event.value);
    this.stockDataSource = new StockDataSource(this.modeleChoisi, this.stockService, this.modeleService);
    console.log(this.stockDataSource);
  }
}
export class StockDataSource extends DataSource<StockVersion> {
  constructor(private modele: ModeleDetail, private stockService: StockService, private modeleService: ModeleService) {
    super();
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<StockVersion[]> {
    const rows = [];
    if (this.modele != null) {
      this.modele.versions.forEach(version => {
        var stockVersion: StockVersion = {Nombre: 0, NomVersion: null, CodeVersion: null, Update: "", Stock: []};
        this.stockService.getStockVersion(version.CodeVersion).subscribe(res => {
          stockVersion.Stock = res as StockVehicule[];
          stockVersion.Nombre = 0;
          stockVersion.NomVersion = version.NomVersion;
          stockVersion.CodeVersion = version.CodeVersion;
          stockVersion.Stock.forEach(element => {
            for (var i = 1; i < element.vehicules.length; i++) {
              const e = element;
              stockVersion.Stock.push(e);
              e.vehicules[0] = element.vehicules[i];
            }
          });
          rows.push(stockVersion);
          console.log(rows);
        });
      });
    }
    return of(rows);
  }
  disconnect() { }
}
