import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ModeleService} from '../../../services/modele.service';
import {ModeleDetail} from '../../../services/entites/modeleDetail.model';
import {VersionService} from '../../../services/version.service';
import {SupprimerVersionComponent} from './supprimer-version/supprimer-version.component';
import {AjouterVersionComponent} from './ajouter-version/ajouter-version.component';
import {ModifierVerionComponent} from './modifier-verion/modifier-verion.component';
import {MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {VersionDetail} from '../../../services/entites/versionDetail.model';
import {InfosDialogComponent} from './infos-dialog/infos-dialog.component';
import {ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-gestion-version',
  templateUrl: './gestion-version.component.html',
  styleUrls: ['../gestion-modele/gestion-modele.component.scss']
})

/**
 *  Classe de gestion des versions
 *  Implemente OnInit pour l'initialisation du composant, et AfterViewInit pour le filtre et le tri et la pagination
 *  @author CHABANE CHAOUCH Zahra, CHOUAKI Salim
 *
 */
export class GestionVersionComponent implements OnInit, AfterViewInit {
  // Code du modele pour lequel on veut gerer les versions
  private codeModele: string;

  // Le data source qui contient les informations a afficher dans le mat-table
  private versionDataSource = new MatTableDataSource<VersionDetail>();

  // Les modeles pour le mat-select
  private modeles: ModeleDetail[];

  // Les colonnes a afficher dans le mat-table
  displayedColumns = ['CodeVersion', 'NomVersion', 'modele', 'options', 'gestion'];

  // Réference vers le mat-sort
  @ViewChild(MatSort) sort: MatSort;

  // Réference vers le mat-paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Constructeur de la classe, il redefinit le filtre de recherche pour inclure les sous-objets
   * @param modeleService
   * Il va permettre d'avoir les modeles a afficher
   * @param versionService
   * il va permettre d'avoir les versions a afficher
   * @param matDialog
   * Un service qui va permettre d'ouvrir les boites de dialogues pour ajouter, supprimer et modifier
   */
  constructor(private versionService: VersionService,
              private modeleService: ModeleService,
              private activatedroute: ActivatedRoute,
              private matDialog: MatDialog) {
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
  /**
   *  Executé a l'initialisation du composant, récupere les données et initialise la pagination
   */
  ngOnInit() {
    try {
      this.codeModele = this.activatedroute.snapshot.params.CodeModele; /*récupérer le code modèle passé en paramètre dans l'url*/
    } catch {
      this.codeModele = null;
    }
    this.refreshData();

    this.modeleService.getModeles().subscribe(modeles => {
      this.modeles = modeles as ModeleDetail[];
    });
  }

  refreshData() {
    if ((this.codeModele !== '') && (this.codeModele != null )) {
      this.versionService.getVersions(this.codeModele).subscribe(resultat => {
        this.versionDataSource.data = resultat as VersionDetail[];
      });
    }
  }

  /**
   * Modifier les versions au changement du modele sélectionné dans le mat-select
   * @param $event
   * l'evenement du changement du mat-select
   */
  changerVersions($event) {
    this.codeModele = $event.value;
    this.versionService.getVersions($event.value).subscribe(res => {
      this.versionDataSource.data = res as VersionDetail[];
    });
  }

  /**
   * Ajouter une version, invoque le composant ajouterVersion
   */
  ajouterVersion() {
    if ((this.codeModele !== '') && (this.codeModele != null )) {
      const dialogRef: MatDialogRef<AjouterVersionComponent> = this.matDialog.open(AjouterVersionComponent, {
        width: '800px',
      });
      dialogRef.componentInstance.codeModele = this.codeModele;
      dialogRef.afterClosed().subscribe(() => {
        this.refreshData();
      });
    } else {
      alert("Veuillez choisir un modèle");
    }
  }

  /**
   *  Modifier une version, invoque le composant ModifierVersion
   * @param version
   * La version a modifier
   */
  modifierVersion(version) {
    const dialogRef: MatDialogRef<ModifierVerionComponent> = this.matDialog.open(ModifierVerionComponent, {width: '800px', height: '80%'});
    dialogRef.componentInstance.version = version;
    dialogRef.afterClosed().subscribe(() => {
      this.refreshData();
    });
  }

  /**
   * Supprimer une version, invoque le composant SupprimerVersion
   * @param version
   * La version a supprimer
   */
  supprimerVersion(version) {
    const dialogRef: MatDialogRef<SupprimerVersionComponent> = this.matDialog.open(SupprimerVersionComponent, {
      width: '800px',
      data: {version}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refreshData();
    });
  }


  afficherTousOptions(version) {
    const dialogRef: MatDialogRef<InfosDialogComponent> = this.matDialog.open(InfosDialogComponent, {width: '800px', height: '60%'});
    dialogRef.componentInstance.version = version;
    dialogRef.afterClosed().subscribe(() => {
    });

  }
  /**
   *  Association du sort et de la pagination au dataSource
   */
  ngAfterViewInit(): void {
    this.versionDataSource.sort = this.sort;
    this.versionDataSource.paginator = this.paginator;
  }

  /**
   * Application du filtre entré dans la recherche
   * @param value
   * La valeur entrée dans la recherche
   */
  appliquerFiltre = (value: string) => {
    this.versionDataSource.filter = value.trim().toLocaleLowerCase();
  }
}
