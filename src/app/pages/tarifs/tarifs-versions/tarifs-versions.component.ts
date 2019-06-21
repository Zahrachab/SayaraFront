import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {VersionDetail} from '../../../services/entites/versionDetail.model';
import {ModeleDetail} from '../../../services/entites/modeleDetail.model';
import {VersionService} from '../../../services/version.service';
import {ModeleService} from '../../../services/modele.service';

@Component({
  selector: 'app-tarifs-versions',
  templateUrl: './tarifs-versions.component.html',
  styleUrls: ['./tarifs-versions.component.scss']
})
export class TarifsVersionsComponent implements OnInit, AfterViewInit {
// Le data source qui contient les informations a afficher dans le mat-table
  private versionDataSource = new MatTableDataSource<VersionDetail>();
  // Les modeles pour le mat-select
  private modeles: ModeleDetail[];

  // Les colonnes a afficher dans le mat-table
  displayedColumns = ['CodeVersion', 'NomVersion', 'NomModele', 'Apartir', 'Jusqua', 'Prix'];
  interval: any;

  // Réference vers le mat-sort
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Constructeur de la classe, il redefinit le filtre de recherche pour inclure les sous-objets (options et versions)
   * @param modeleService
   * Il va permettre d'avoir les modeles a afficher
   * @param versionService
   * Un service qui va permettre d'ouvrir les boites de dialogues pour ajouter, supprimer et modifier
   */
  constructor(private modeleService: ModeleService, private versionService: VersionService) {
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
        });
      }
    });
  }

  /**
   *  Association du sort et de la pagination au dataSource
   */
  ngAfterViewInit(): void {
    this.versionDataSource.sort = this.sort;
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
