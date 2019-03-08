import {Component, Input, OnInit} from '@angular/core';
import {ModeleService} from '../../../services/modele.service';
import {MatDialog} from '@angular/material';
import {AjouterModeleComponent} from '../gestion-modele/ajouterModele/ajouterModele.component';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {ModeleDetail} from '../../../services/entites/modeleDetail.model';
import {OptionService} from '../../../services/option.service';
import {Option} from '../../../services/entites/option.model';
  /* pour lire le code modèle passé en paramètre dans l'url */

@Component({
  selector: 'app-gestion-options',
  templateUrl: './gestion-options.component.html',
  styleUrls: ['./gestion-options.component.scss']
})
export class GestionOptionsComponent implements OnInit {

  public dataSource: ModeleDataSource;
  private codeModele: any;
  interval: any;
  displayedColumns = ['CodeOption', 'NomOption', 'gestion'];

  constructor(private optionService: OptionService, private modalService: MatDialog, private _Activatedroute: ActivatedRoute) {}
  ngOnInit() {
    this.codeModele = this._Activatedroute.snapshot.params.CodeModele;
    this.refreshData();
    this.interval = setInterval(() => {
      this.refreshData();
    }, 200000);
  }

  refreshData() {
    this.dataSource = new ModeleDataSource(this.optionService, this.codeModele);
  }

  openModal() {
  }

}


export class ModeleDataSource extends DataSource<any> {
  constructor(private optionService: OptionService, private codeModele: string) {
    super();
  }

  connect(): Observable<Option[]> {
    return this.optionService.getOptions(this.codeModele);
  }
  disconnect() {}


}
