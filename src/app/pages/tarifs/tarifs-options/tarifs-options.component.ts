import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {ModeleDetail} from '../../../services/entites/modeleDetail.model';
import {ModeleService} from '../../../services/modele.service';
import {OptionService} from '../../../services/option.service';
  import {OptionDetail} from '../../../services/entites/optionDetail.model';

@Component({
  selector: 'app-tarifs-options',
  templateUrl: './tarifs-options.component.html',
  styleUrls: ['./tarifs-options.component.scss']
})
export class TarifsOptionsComponent implements OnInit, AfterViewInit {
// Le data source qui contient les informations a afficher dans le mat-table
  private optionDataSource = new MatTableDataSource<OptionDetail>();
  // Les modeles pour le mat-select
  private modeles: ModeleDetail[];

  // Les colonnes a afficher dans le mat-table
  displayedColumns = ['CodeOption', 'NomOption', 'NomModele', 'Apartir', 'Jusqua', 'Prix'];
  interval: any;

  // Réference vers le mat-sort
  @ViewChild(MatSort) sort: MatSort;
  /**
   * Constructeur de la classe, il redefinit le filtre de recherche pour inclure les sous-objets (options et versions)
   * @param modeleService
   * Il va permettre d'avoir les modeles a afficher
   * @param optionService
   * Un service qui va permettre d'ouvrir les boites de dialogues pour ajouter, supprimer et modifier
   */
  constructor(private modeleService: ModeleService, private optionService: OptionService) {
  }

  /**
   *  Executé a l'initialisation du composant, récupere les données
   */
  ngOnInit() {
    this.modeleService.getModeles().subscribe(modeles => {
      const options = new Array<OptionDetail>();
      this.modeles = modeles as ModeleDetail[];
      for (const modele of this.modeles) {
        this.optionService.getOptionsWithLigneTarifs(modele.CodeModele).subscribe(res => {
          for (const option of res as OptionDetail[]) {
            option.NomModele = modele.NomModele;
            options.push(option);
          }
          this.optionDataSource.data = options;
        });
      }
    });
  }

  /**
   *  Association du sort et de la pagination au dataSource
   */
  ngAfterViewInit(): void {
    this.optionDataSource.sort = this.sort;
  }

  /**
   * Application du filtre entré dans la recherche
   * @param value
   * La valeur entrée dans la recherche
   */
  appliquerFiltre = (value: string) => {
    this.optionDataSource.filter = value.trim().toLocaleLowerCase();
  }

}
