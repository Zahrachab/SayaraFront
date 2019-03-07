import {Component, OnInit} from '@angular/core';
import {ModeleService} from '../../../services/modele.service';
import 'rxjs/add/observable/of';
import {AjouterModeleComponent} from './ajouterModele/ajouterModele.component';
import {MatDialog} from '@angular/material';
import {ModeleDataSource} from '../../../dataSources/ModeleDataSource';

@Component({
  selector: 'app-gestion-modele',
  templateUrl: './gestion-modele.component.html',
  styleUrls: ['./gestion-modele.component.scss']
})
export class GestionModeleComponent implements OnInit {
  private dataSource: ModeleDataSource;
  displayedColumns = ['CodeModele', 'NomModele', 'versions', 'options', 'gestion'];

  constructor(private modeleService: ModeleService, private modalService: MatDialog) {
  }

  ngOnInit() {
    this.dataSource = new ModeleDataSource(this.modeleService);
  }

  openModal() {
    this.modalService.open(AjouterModeleComponent, {width: '800px'});
  }

}


