import {Component, OnInit} from '@angular/core';
import {VersionDataSource} from '../../../dataSources/VersionDataSource';
import {ModeleService} from '../../../services/modele.service';
import {ModeleDetail} from '../../../services/entites/modeleDetail.model';
import {VersionService} from '../../../services/version.service';
import {MatDialog} from '@angular/material';
import {SupprimerVersionComponent} from './supprimer-version/supprimer-version.component';

@Component({
  selector: 'app-gestion-version',
  templateUrl: './gestion-version.component.html',
  styleUrls: ['./gestion-version.component.scss']
})
export class GestionVersionComponent implements OnInit {
  private versionDataSource: VersionDataSource;
  private modeles: ModeleDetail[];
  displayedColumns = ['CodeVersion', 'NomVersion', 'modele', 'options', 'gestion'];

  constructor(private versionService: VersionService, private modeleService: ModeleService, private matDialog: MatDialog) {
  }

  ngOnInit() {
      this.modeleService.getModeles().subscribe(modeles => {
      this.modeles = modeles as ModeleDetail[];
    });
  }


  changerOptions($event) {
    this.versionDataSource = new VersionDataSource(this.versionService, $event.value);
  }

  supprimerVersion(version) {
    this.matDialog.open(SupprimerVersionComponent, {width: '800px', data: {version}});
  }
}
