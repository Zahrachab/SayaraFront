import {Component, OnInit} from '@angular/core';
import {VersionDataSource} from '../../../dataSources/VersionDataSource';
import {ModeleService} from '../../../services/modele.service';
import {ModeleDetail} from '../../../services/entites/modeleDetail.model';
import {VersionService} from '../../../services/version.service';
import {MatDialog} from '@angular/material';
import {SupprimerVersionComponent} from './supprimer-version/supprimer-version.component';
import {AjouterVersionComponent} from './ajouter-version/ajouter-version.component';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-gestion-version',
  templateUrl: './gestion-version.component.html',
  styleUrls: ['./gestion-version.component.scss']
})
export class GestionVersionComponent implements OnInit {
  private codeModele: string;
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
    this.codeModele = $event.value;
    this.versionDataSource = new VersionDataSource(this.versionService, $event.value);
  }

  openModal() {
    const dialogRef: MatDialogRef<AjouterVersionComponent> = this.matDialog.open(AjouterVersionComponent, {width: '800px', height: '85%'});
    dialogRef.componentInstance.codeModele = this.codeModele;
  }
  modifierModele() {

  }

  supprimerVersion(version) {
    this.matDialog.open(SupprimerVersionComponent, {width: '800px', data: {version}});
  }
}
