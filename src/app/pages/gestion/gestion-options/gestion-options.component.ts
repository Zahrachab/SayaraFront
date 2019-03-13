import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import {OptionService} from '../../../services/option.service';
import {OptionDataSource} from '../../../dataSources/OptionDataSource';
import {ModeleDetail} from '../../../services/entites/modeleDetail.model';
import {ModeleService} from '../../../services/modele.service';

@Component({
  selector: 'app-gestion-options',
  templateUrl: './gestion-options.component.html',
  styleUrls: ['./gestion-options.component.scss']
})
export class GestionOptionsComponent implements OnInit {

  public dataSource: OptionDataSource;
  private codeModele: any;
  private modeles: ModeleDetail[];
  interval: any;
  displayedColumns = ['CodeOption', 'NomOption', 'gestion'];
  constructor(private optionService: OptionService, private modalService: MatDialog, private _Activatedroute: ActivatedRoute, private modeleService: ModeleService) {}
  ngOnInit() {
    try {
      this.codeModele = this._Activatedroute.snapshot.params.CodeModele; /*récupérer le code modèle passé en paramètre dans l'url*/
    } catch {
      this.codeModele = null;
    }
    this.modeleService.getModeles().subscribe(modeles => {
      this.modeles = modeles as ModeleDetail[];
    });
    this.refreshData();
    console.log(this.codeModele);

  }

  refreshData() {
    if ((this.codeModele !== '') || (this.codeModele != null )) {
        this.dataSource = new OptionDataSource(this.optionService, this.codeModele);
    }
  }

  changerOptions($event) {
    this.dataSource = new OptionDataSource(this.optionService, $event.value);
  }


}


