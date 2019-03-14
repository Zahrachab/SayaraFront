
import { Component, OnInit, Input } from '@angular/core';
import { ModeleService } from '../../../services/modele.service';
import 'rxjs/add/observable/of';
import {AjouterModeleComponent} from './ajouterModele/ajouterModele.component';
import {MatDialog} from '@angular/material';
import {ModeleDataSource} from '../../../dataSources/ModeleDataSource';
import {SupprimerModeleComponent} from './supprimer-modele/supprimer-modele.component';
import {ModeleDetail} from '../../../services/entites/modeleDetail.model';

@Component({
  selector: 'app-gestion-modele',
  templateUrl: './gestion-modele.component.html',
  styleUrls: ['./gestion-modele.component.scss']
})
export class GestionModeleComponent implements OnInit {
  private dataSource: ModeleDataSource;
  interval: any;
  displayedColumns = ['CodeModele', 'NomModele', 'versions', 'options', 'gestion'];

  constructor(private modeleService: ModeleService, private modalService: MatDialog) {
  }

  ngOnInit() {
    /*récupérer les données à partir du service */
    this.refreshData();
    /*rafraichir les données chaque 5 secondes*/
   /* this.interval = setInterval(() => {
      this.refreshData();
    }, 5000);
*/
  }

  refreshData() {
    this.dataSource = new ModeleDataSource(this.modeleService);
  }

  openModal() {
    this.modalService.open(AjouterModeleComponent, {width: '850px', height: '80%'});
  }

  modifierModele(modele: ModeleDetail) {
    this.modalService.open(AjouterModeleComponent, {width: '800px'});
  }

  supprimerModele(modele) {
    this.modalService.open(SupprimerModeleComponent, {width: '800px', data: {modele}});
  }
}


