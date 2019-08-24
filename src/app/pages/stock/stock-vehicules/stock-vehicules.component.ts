import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {StockVersion} from '../../../services/entites/stock.modele';
import {ModeleDetail} from '../../../services/entites/modeleDetail.model';
import {VersionService} from '../../../services/version.service';
import {ModeleService} from '../../../services/modele.service';
import {StockService} from '../../../services/stock.service';
import {StockVehicule} from '../../../services/entites/stockVehicule.model';
import {MatTableDataSource} from '@angular/material';
import {ToastrManager} from 'ng6-toastr-notifications';
import {InfosMarque} from '../../../services/entites/InfosMarque.model';


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
      transition('expanded <=> collapsed', animate('22ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class StockVehiculesComponent implements  OnInit{
  // Les modeles pour le mat-select
  private modeles: ModeleDetail[];
  //modele choisi
  private modeleChoisi : ModeleDetail = null;
  //stock d'un modèle
  columnsToDisplay = ['CodeVersion', 'NomVersion', 'Nombre', 'TarifDeBase'];
  columnsToDisplay1 = ['CodeVersion', 'NomVersion', 'Nombre', 'Tarif De Base'];
  displayedColumnsVehicules = ['NumChassis', 'Couleur', 'Montant' , 'détail'];
  stockDataSource: MatTableDataSource<StockVersion> = new MatTableDataSource(null);
  expandedElement1: any | null;
  expandedElement2: any | null;

  private infos: InfosMarque;
  isExpansionDetailRow = (i: number, row: object) => (1 === 1) ;
  constructor(private versionService: VersionService,
              private modeleService: ModeleService,
              private toastr: ToastrManager,
              private stockService: StockService) {
    this.redefinirFiltre();
  }

  ngOnInit(): void {
    this.stockService.getInfosMarque().subscribe( res => {
      this.infos = res as InfosMarque;
    });
    this.modeleService.getModeles().subscribe(res => {
      this.modeles = res as ModeleDetail[];
    }, error => {
      //Erreur dans l'obtention des modeles
      this.toastr.errorToastr(error);
    });
  }


  choisirModele($event) {
    console.log($event.value);
    this.modeleChoisi = this.modeles.find(m => m.CodeModele == $event.value);
    this.getStock();
  }

  /**
   * récupérer le stock d'un modèle
   */

  getStock() {
    if(this.modeleChoisi != null) {
        const rows = [];
        this.modeleChoisi.versions.forEach(version => {
          var stockVersion: StockVersion = {Nombre: 0, NomVersion: null, CodeVersion: null, Update: "", Stock: [], TarifDeBase: null};
          this.stockService.getStockVersion(version.CodeVersion).subscribe(res => {
            stockVersion.Stock = res as StockVehicule[];
            stockVersion.Nombre = 0;
            stockVersion.NomVersion = version.NomVersion;
            stockVersion.CodeVersion = version.CodeVersion;
            stockVersion.TarifDeBase = stockVersion.Stock[0].tarifBase.Prix.toString() + " DzA" ;
            stockVersion.Stock.forEach(element => {
              stockVersion.Nombre += element.quantite;
              for (var i = 1; i < element.vehicules.length; i++) {
                const e = element;
                stockVersion.Stock.push(e);
                e.vehicules[0] = element.vehicules[i];
              }
            });
            rows.push(stockVersion);
            this.stockDataSource.data = rows;
          }, error => {
            // Erreur dans l'obtention du stock du modele
            this.toastr.errorToastr(error);
          });
        });
      }
  }



  /**
   * Application du filtre entré dans la recherche
   * @param value
   * La valeur entrée dans la recherche
   */
  appliquerFiltre = (value: string) => {
    this.stockDataSource.filter = value.trim().toLocaleLowerCase();
  }

  redefinirFiltre() {
    // Redéfinition du filtre pour prendre en compte les sous objets
    this.stockDataSource.filterPredicate = (order: any, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();
      const listAsFlatString = (obj): string => {
        let returnVal = '';
        Object.values(obj).forEach((val) => {
          if (typeof val !== 'object') { // Si ce n'est pas un objet
            returnVal = returnVal + ' ' + val;
          } else if (val !== null) { // Si c'est un objet non null
            returnVal = returnVal + ' ' + listAsFlatString(val);
          }
        });
        return returnVal.trim().toLowerCase();
      };
      return listAsFlatString(order).includes(transformedFilter);
    };
  }

}
