import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {VersionDetail} from '../../../services/entites/versionDetail.model';
import {ModeleDetail} from '../../../services/entites/modeleDetail.model';
import {VersionService} from '../../../services/version.service';
import {ModeleService} from '../../../services/modele.service';
import {ToastrManager} from 'ng6-toastr-notifications';

@Component({
  selector: 'app-tarifs-versions',
  templateUrl: './tarifs-versions.component.html',
  styleUrls: ['../tarifs-options/tarifs-options.component.scss']
})
export class TarifsVersionsComponent implements OnInit, AfterViewInit {
// Le data source qui contient les informations a afficher dans le mat-table
  private versionDataSource = new MatTableDataSource<VersionDetail>();
  // Les modeles pour le mat-select
  private modeles: ModeleDetail[];

  // Les colonnes a afficher dans le mat-table
  displayedColumns = ['CodeVersion', 'NomVersion', 'NomModele', 'Apartir', 'Jusqua', 'Prix'];
  interval: any;


  // Réference vers le mat-paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // Réference vers le mat-sort
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Constructeur de la classe, il redefinit le filtre de recherche pour inclure les sous-objets (options et versions)
   * @param modeleService
   * Il va permettre d'avoir les modeles a afficher
   * @param versionService
   * Un service qui va permettre d'ouvrir les boites de dialogues pour ajouter, supprimer et modifier
   */
  constructor(private modeleService: ModeleService,
              private versionService: VersionService,
              private toastr: ToastrManager) {
    this.filter();
  }

  /**
   *  Executé a l'initialisation du composant, récupere les données
   */
  ngOnInit() {
    this.modeleService.getModeles().subscribe(modeles => {
      const versions = new Array<VersionDetail>();
      this.modeles = modeles as ModeleDetail[];
      for (const modele of this.modeles) {
        this.versionService.getVersions(modele.CodeModele).subscribe(res => {
          for (const version of res as VersionDetail[]) {
            versions.push(version);
          }
          this.versionDataSource.data = versions;
        }, error => {
          // Erreur dans l'obtentention du tarif d'une version
          this.toastr.errorToastr(error);
        });
      }
    }, error => {
      // Erreur dans l'obtention des modeles
      this.toastr.errorToastr(error);
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

  /**
   * redéfinir le filtre pour prendre en considération tous les sous objets d'une ligne
   */
  filter() {
    this.versionDataSource.filterPredicate = (order: any, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();
      const listAsFlatString = (obj): string => {
        let returnVal = '';
        Object.values(obj).forEach((val) => {
          if (typeof val !== 'object') { // Si ce n'est pas un objet
            returnVal = returnVal + ' ' + val;
          } else if (val !== null) { // Si c'est un objet non null
            returnVal = returnVal + ' ' + listAsFlatString(val);
          }
        });
        return returnVal.trim().toLowerCase();
      };
      return listAsFlatString(order).includes(transformedFilter);
    };
  }
}
