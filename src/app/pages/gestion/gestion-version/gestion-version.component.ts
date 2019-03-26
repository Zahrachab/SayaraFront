import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ModeleService} from '../../../services/modele.service';
import {ModeleDetail} from '../../../services/entites/modeleDetail.model';
import {VersionService} from '../../../services/version.service';
import {SupprimerVersionComponent} from './supprimer-version/supprimer-version.component';
import {AjouterVersionComponent} from './ajouter-version/ajouter-version.component';
import {ModifierVerionComponent} from './modifier-verion/modifier-verion.component';
import {MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {VersionDetail} from '../../../services/entites/versionDetail.model';



@Component({
  selector: 'app-gestion-version',
  templateUrl: './gestion-version.component.html',
  styleUrls: ['./gestion-version.component.scss']
})
export class GestionVersionComponent implements OnInit, AfterViewInit {
  private codeModele: string;
  private versionDataSource = new MatTableDataSource<VersionDetail>();
  private modeles: ModeleDetail[];
  displayedColumns = ['CodeVersion', 'NomVersion', 'modele', 'options', 'gestion'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private versionService: VersionService, private modeleService: ModeleService, private matDialog: MatDialog) {
    this.versionDataSource.filterPredicate = (order: any, filter: string) => {
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
    this.modeleService.getModeles().subscribe(modeles => {
      this.modeles = modeles as ModeleDetail[];
    });
  }


  changerOptions($event) {
    this.codeModele = $event.value;
    this.versionService.getVersions($event.value).subscribe(res => {
      this.versionDataSource.data = res as VersionDetail[];
    });
  }


  /* Ouvrir un mat dialog pour l'ajout d'une version au modèle courant */
  openModal() {
    if (this.codeModele != null) {
      const dialogRef: MatDialogRef<AjouterVersionComponent> = this.matDialog.open(AjouterVersionComponent, {width: '800px', height: '80%'});
      dialogRef.componentInstance.codeModele = this.codeModele;
      dialogRef.afterClosed().subscribe(res => {
        this.versionService.getVersions(this.codeModele).subscribe(resultat => {
          this.versionDataSource.data = resultat as VersionDetail[];
        });
      });
    }
  }

  /* Ouvrir un mat dialog pour la modification des informations d'une version */
  modifierVersion(version) {
    const dialogRef: MatDialogRef<ModifierVerionComponent> = this.matDialog.open(ModifierVerionComponent, {width: '800px', height: '80%'});
    dialogRef.componentInstance.version = version;
    dialogRef.afterClosed().subscribe(res => {
      this.versionService.getVersions(this.codeModele).subscribe(resultat => {
        this.versionDataSource.data = resultat as VersionDetail[];
      });
    });
  }

  supprimerVersion(version) {
    const dialogRef: MatDialogRef<SupprimerVersionComponent> = this.matDialog.open(SupprimerVersionComponent, {width: '800px', data: {version}});
    dialogRef.afterClosed().subscribe(res => {
      this.versionService.getVersions(this.codeModele).subscribe(resultat => {
        this.versionDataSource.data = resultat as VersionDetail[];
      });
    });
  }

  ngAfterViewInit(): void {
    this.versionDataSource.sort = this.sort;
    this.versionDataSource.paginator = this.paginator;
  }

  appliquerFiltre = (value: string) => {
    this.versionDataSource.filter = value.trim().toLocaleLowerCase();
  }
}
