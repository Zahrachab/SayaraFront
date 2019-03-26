import {Component, OnInit, Input, ViewChild, AfterViewInit} from '@angular/core';
import {ModeleService} from '../../../services/modele.service';
import 'rxjs/add/observable/of';
import {AjouterModeleComponent} from './ajouterModele/ajouterModele.component';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SupprimerModeleComponent} from './supprimer-modele/supprimer-modele.component';
import {ModeleDetail} from '../../../services/entites/modeleDetail.model';
import {ModifierModeleComponent} from './modifier-modele/modifier-modele.component';

@Component({
  selector: 'app-gestion-modele',
  templateUrl: './gestion-modele.component.html',
  styleUrls: ['./gestion-modele.component.scss']
})
export class GestionModeleComponent implements OnInit, AfterViewInit {
  private dataSource = new MatTableDataSource<ModeleDetail>();
  interval: any;
  displayedColumns = ['CodeModele', 'NomModele', 'versions', 'options', 'gestion'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private modeleService: ModeleService, private modalService: MatDialog) {
    this.dataSource.filterPredicate = (order: any, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();

      const listAsFlatString = (obj): string => {
        let returnVal = '';

        Object.values(obj).forEach((val) => {
          if (typeof val !== 'object') {
            returnVal = returnVal + ' ' + val;
          } else if (val !== null) {
            returnVal = returnVal + ' ' + listAsFlatString(val);
          }
        });

        return returnVal.trim().toLowerCase();
      };
      return listAsFlatString(order).includes(transformedFilter);
    };
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    /*récupérer les données à partir du service */
    this.refreshData();
    /*rafraichir les données chaque 5 secondes*/
    /* this.interval = setInterval(() => {
       this.refreshData();
     }, 5000);
 */
  }

  refreshData() {
    this.modeleService.getModeles().subscribe(res => {
      this.dataSource.data = res as ModeleDetail[];
    });
  }

  openModal() {
    this.modalService.open(AjouterModeleComponent, {width: '850px', height: '80%'});
  }

  modifierModele(modele: ModeleDetail) {
    this.modalService.open(ModifierModeleComponent, {width: '800px', data: {modele}});
  }

  supprimerModele(modele) {
    this.modalService.open(SupprimerModeleComponent, {width: '800px', data: {modele}});
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  appliquerFiltre = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


}


