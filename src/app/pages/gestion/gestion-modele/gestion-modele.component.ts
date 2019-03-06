import { Component, OnInit } from '@angular/core';
import { ModeleService } from '../../../services/modele.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {DataSource} from '@angular/cdk/collections';
import {Modele} from '../../../services/entites/modele.model';
import {ModeleDetail} from '../../../services/entites/modeleDetail.model';
import {AjouterModeleComponent} from './ajouterModele/ajouterModele.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-gestion-modele',
  templateUrl: './gestion-modele.component.html',
  styleUrls: ['./gestion-modele.component.scss']
})
export class GestionModeleComponent implements OnInit {
  private dataSource: ModeleDataSource;
  interval: any;
  displayedColumns = ['CodeModele', 'NomModele', 'versions', 'options', 'gestion'];

  constructor(private modeleService: ModeleService, private modalService: MatDialog) {}
  ngOnInit() {
    /*récupérer les données à partir du service */
    this.refreshData();
    /*rafraichir les données chaque 5 secondes*/
    this.interval = setInterval(() => {
      this.refreshData();
    }, 5000);

  }

  refreshData() {
    this.dataSource = new ModeleDataSource(this.modeleService);
  }

  openModal() {
    this.modalService.open(AjouterModeleComponent, {width: '800px'});
  }

}


export class ModeleDataSource extends DataSource<any> {
  constructor(private modeleService: ModeleService) {
    super();
  }

  connect(): Observable<ModeleDetail[]> {
    return this.modeleService.getModeles();
  }
  disconnect() {}


}
