import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {ModeleService} from '../../../services/modele.service';
import 'rxjs/add/observable/of';
import {AjouterModeleComponent} from './ajouterModele/ajouterModele.component';
import {MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SupprimerModeleComponent} from './supprimer-modele/supprimer-modele.component';
import {ModeleDetail} from '../../../services/entites/modeleDetail.model';
import {ModifierModeleComponent} from './modifier-modele/modifier-modele.component';
import {FicheModeleComponent} from './fiche-modele/fiche-modele.component';
import {PusherService} from '../../../services/pusher.service';
import {ToastrManager} from 'ng6-toastr-notifications';

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

  // En attente des données
  loading = true;

  /**
   * Constructeur de la classe, il redefinit le filtre de recherche pour inclure les sous-objets (options et versions)
   * @param modeleService
   * Il va permettre d'avoir les modeles a afficher
   * @param matDialog
   * Un service qui va permettre d'ouvrir les boites de dialogues pour ajouter, supprimer et modifier
   * @param pushService
   * Un service qui permet de faire la synchronisation en temps réel
   */
  constructor(private modeleService: ModeleService,
              private matDialog: MatDialog,
              private toastr: ToastrManager,
              private pushService: PusherService) {
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

    this.pushService.modeleChannel.bind('newModele', data => {
      setTimeout(() => {
        this.modeleService.getModele(data.CodeModele).subscribe(res => {
          const tmpData = this.dataSource.data;
          tmpData.push(res as ModeleDetail);
          this.dataSource.data = tmpData;
        });
      }, 1000);
    });
  }

  /**
   *  Executé a l'initialisation du composant, récupere les données
   */
  ngOnInit() {
    /*récupérer les données à partir du service */
    this.refreshData();
  }

  /**
   * Récuperation des modéles
   */
  refreshData() {
    this.modeleService.getModeles().subscribe(res => {
      this.loading = false;
      this.dataSource.data = res as ModeleDetail[];
    }, error => {
      // le probleme de connexion
      this.toastr.errorToastr(error);
    });
  }

  /**
   * Ajouter un modele, invoque le composant ajouterModele
   */
  ajouterModele() {
    // Ouverture de la boite de dialogue, composant AjouterModele
    const dialogRef: MatDialogRef<AjouterModeleComponent> = this.matDialog.open(AjouterModeleComponent, {
      width: '850px',
      height: 'auto'
    });

    // Rafraichissement de la page apres fermeture de la boite de dialogue
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.refreshData();
      }, 3000);
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
    const dialogRef: MatDialogRef<ModifierModeleComponent> = this.matDialog.open(ModifierModeleComponent, {
      width: '800px',
      data: {modele}
    });
    // Rafraichissement de la page apres fermeture de la boite de dialogue
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.refreshData();
      }, 3000);
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
    const dialogRef: MatDialogRef<SupprimerModeleComponent> = this.matDialog.open(SupprimerModeleComponent, {
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

  afficherFiche(modele: ModeleDetail) {
    const dialogRef: MatDialogRef<FicheModeleComponent> = this.matDialog.open(FicheModeleComponent, {width: '800px', height: '80%'});
    dialogRef.componentInstance.modele = modele;
  }

}


