import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ModeleDetail} from '../../../services/entites/modeleDetail.model';
import {ModeleService} from '../../../services/modele.service';
import {OptionService} from '../../../services/option.service';
  import {OptionDetail} from '../../../services/entites/optionDetail.model';
import {ToastrManager} from 'ng6-toastr-notifications';

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

  // Réference vers le mat-paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // Réference vers le mat-sort
  @ViewChild(MatSort) sort: MatSort;
  /**
   * Constructeur de la classe, il redefinit le filtre de recherche pour inclure les sous-objets (options et versions)
   * @param modeleService
   * Il va permettre d'avoir les modeles a afficher
   * @param optionService
   * Un service qui va permettre d'ouvrir les boites de dialogues pour ajouter, supprimer et modifier
   */
  constructor(private modeleService: ModeleService,
              private optionService: OptionService,
              private toastr: ToastrManager) {
    this.filter();
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
        }, error => {
          // Erreur dans l'obtention d'un tarif pour une option donné
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
    this.optionDataSource.sort = this.sort;
    this.optionDataSource.paginator = this.paginator;
  }

  /**
   * Application du filtre entré dans la recherche
   * @param value
   * La valeur entrée dans la recherche
   */
  appliquerFiltre = (value: string) => {
    this.optionDataSource.filter = value.trim().toLocaleLowerCase();
  }


  /**
   * redéfinir le filtre pour prendre en considération tous les sous objets d'une ligne
   */
  filter() {
    this.optionDataSource.filterPredicate = (order: any, filter: string) => {
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
