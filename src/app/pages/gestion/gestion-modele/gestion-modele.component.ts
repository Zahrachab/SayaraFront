import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {ModeleService} from '../../../services/modele.service';
import 'rxjs/add/observable/of';
import {AjouterModeleComponent} from './ajouterModele/ajouterModele.component';
import {MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SupprimerModeleComponent} from './supprimer-modele/supprimer-modele.component';
import {ModeleDetail} from '../../../services/entites/modeleDetail.model';
import {ModifierModeleComponent} from './modifier-modele/modifier-modele.component';

@Component({
  selector: 'app-gestion-modele',
  templateUrl: './gestion-modele.component.html',
  styleUrls: ['./gestion-modele.component.scss']
})
/**
 *  Classe de gestion des modeles de véhicules
 *  Implemente OnInit pour l'initialisation du composant, et AfterViewInit pour le filtre et le tri et la pagination
 *  @author CHABANE CHAOUCH Zahra, CHOUAKI Salim
 *
 */
export class GestionModeleComponent implements OnInit, AfterViewInit {
  // Le data source qui contient les informations a afficher dans le mat-table
  public dataSource = new MatTableDataSource<ModeleDetail>();

  // Les colonnes a afficher dans le mat-table
  displayedColumns = ['CodeModele', 'NomModele', 'versions', 'options', 'couleurs', 'gestion'];
  interval: any;

  // Réference vers le mat-sort
  @ViewChild(MatSort) sort: MatSort;

  // Réference vers le mat-paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Constructeur de la classe, il redefinit le filtre de recherche pour inclure les sous-objets (options et versions)
   * @param modeleService
   * Il va permettre d'avoir les modeles a afficher
   * @param modalService
   * Un service qui va permettre d'ouvrir les boites de dialogues pour ajouter, supprimer et modifier
   */
  constructor(private modeleService: ModeleService, private modalService: MatDialog) {
    // Redéfinition du filtre pour prendre en compte les sous objets
    this.dataSource.filterPredicate = (order: any, filter: string) => {
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

  /**
   *  Executé a l'initialisation du composant, récupere les données
   */
  ngOnInit() {
    /*récupérer les données à partir du service */
    this.refreshData();
    /*rafraichir les données chaque 5 secondes*/
    /* this.interval = setInterval(() => {
       this.refreshData();
     }, 5000);
 */
  }

  /**
   * Récuperation des modéles
   */
  refreshData() {
    this.modeleService.getModeles().subscribe(res => {
      this.dataSource.data = res as ModeleDetail[];
    });
  }

  /**
   * Ajouter un modele, invoque le composant ajouterModele
   */
  ajouterModele() {
    // Ouverture de la boite de dialogue, composant AjouterModele
    const dialogRef: MatDialogRef<AjouterModeleComponent> = this.modalService.open(AjouterModeleComponent, {
      width: '850px',
      height: 'auto'
    });
    // Rafraichissement de la page apres fermeture de la boite de dialogue
    dialogRef.afterClosed().subscribe(() => {
      this.refreshData();
    });
  }

  /**
   *  Modifier un modele, invoque le composant ModifierModele
   * @param modele
   * Le modele a modifier
   */
  modifierModele(modele: ModeleDetail) {
    // Ouverture de la boite de dialogue, composant ModifierModele
    const dialogRef: MatDialogRef<ModifierModeleComponent> = this.modalService.open(ModifierModeleComponent, {
      width: '800px',
      data: {modele}
    });
    // Rafraichissement de la page apres fermeture de la boite de dialogue
    dialogRef.afterClosed().subscribe(() => {
      this.refreshData();
    });
  }

  /**
   * Supprimer un modele, invoque le composant SupprimerModele
   * @param modele
   * Le modele a supprimer
   */
  supprimerModele(modele) {
    // Ouverture de la boite de dialogue, composant SupprimerModele
    const dialogRef: MatDialogRef<SupprimerModeleComponent> = this.modalService.open(SupprimerModeleComponent, {
      width: '800px',
      data: {modele}
    });
    // Rafraichissement de la page apres fermeture de la boite de dialogue
    dialogRef.afterClosed().subscribe(() => {
      this.refreshData();
    });
  }

  /**
   *  Association du sort et de la pagination au dataSource
   */
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Application du filtre entré dans la recherche
   * @param value
   * La valeur entrée dans la recherche
   */
  appliquerFiltre = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


}


