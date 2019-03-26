import {Component, OnInit} from '@angular/core';
import {VersionDataSource} from '../../../dataSources/VersionDataSource';
import {ModeleService} from '../../../services/modele.service';
import {ModeleDetail} from '../../../services/entites/modeleDetail.model';
import {VersionService} from '../../../services/version.service';;
import {SupprimerVersionComponent} from './supprimer-version/supprimer-version.component';
import {AjouterVersionComponent} from './ajouter-version/ajouter-version.component';
import {ModifierVerionComponent} from './modifier-verion/modifier-verion.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {AjouterModeleComponent} from '../gestion-modele/ajouterModele/ajouterModele.component';


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

  constructor(private versionService: VersionService,
              private modeleService: ModeleService,
              private matDialog: MatDialog) {
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


  /* Ouvrir un mat dialog pour l'ajout d'une version au modèle courant */
  openModal() {
    if (this.codeModele != null) {
      const dialogRef: MatDialogRef<AjouterVersionComponent> = this.matDialog.open(AjouterVersionComponent, {width: '800px', height: '80%'});
      dialogRef.componentInstance.codeModele = this.codeModele;
      dialogRef.afterClosed().subscribe(res => {
        this.versionDataSource = new VersionDataSource(this.versionService, this.codeModele);
      });
    }
  }

  /* Ouvrir un mat dialog pour la modification des informations d'une version */
  modifierVersion(version) {
    const dialogRef: MatDialogRef<ModifierVerionComponent> = this.matDialog.open(ModifierVerionComponent, {width: '800px', height: '80%'});
    dialogRef.componentInstance.version = version;
    dialogRef.afterClosed().subscribe(res => {
      this.versionDataSource = new VersionDataSource(this.versionService, this.codeModele);
    });
  }

  supprimerVersion(version) {
    const dialogRef: MatDialogRef<SupprimerVersionComponent> = this.matDialog.open(SupprimerVersionComponent, {width: '800px', data: {version}});
    dialogRef.afterClosed().subscribe(res => {
      this.versionDataSource = new VersionDataSource(this.versionService, this.codeModele);
    });
  }
}
