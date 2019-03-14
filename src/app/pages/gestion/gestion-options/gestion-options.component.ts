import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {OptionService} from '../../../services/option.service';
import {OptionDataSource} from '../../../dataSources/OptionDataSource';

@Component({
  selector: 'app-gestion-options',
  templateUrl: './gestion-options.component.html',
  styleUrls: ['./gestion-options.component.scss']
})
export class GestionOptionsComponent implements OnInit {

  public dataSource: OptionDataSource;
  private codeModele: any;
  interval: any;
  displayedColumns = ['CodeOption', 'NomOption', 'gestion'];

  constructor(private optionService: OptionService, private modalService: MatDialog, private _Activatedroute: ActivatedRoute) {
  }

  ngOnInit() {
    this.codeModele = this._Activatedroute.snapshot.params.CodeModele;
    this.refreshData();
    this.interval = setInterval(() => {
      this.refreshData();
    }, 200000);
  }

  refreshData() {
    this.dataSource = new OptionDataSource(this.optionService, this.codeModele);
  }

  openModal() {
  }

}


