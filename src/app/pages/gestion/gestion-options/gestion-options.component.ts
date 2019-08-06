import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {OptionService} from '../../../services/option.service';
import {ModeleDetail} from '../../../services/entites/modeleDetail.model';
import {ModeleService} from '../../../services/modele.service';
import {AjouterOptionComponent} from './ajouter-option/ajouter-option.component';
import {ModifierOptionComponent} from './modifier-option/modifier-option.component';
import {Option} from '../../../services/entites/option.model';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {ToastrManager} from 'ng6-toastr-notifications';

@Component({
  selector: 'app-gestion-options',
  templateUrl: './gestion-options.component.html',
  styleUrls: ['../gestion-modele/gestion-modele.component.scss']
})
/**
 *  Classe de gestion des options
 *  Implemente OnInit pour l'initialisation du composant, et AfterViewInit pour le filtre et le tri et la pagination
 *  @author CHABANE CHAOUCH Zahra, CHOUAKI Salim
 *
 */
export class GestionOptionsComponent implements OnInit, AfterViewInit {


  // En attente des données
  loading = false;

  // Le data source qui contient les informations a afficher dans le mat-table
  private dataSource = new MatTableDataSource<Option>();

  // Le code modele pour lequel il faut afficher les options
  private codeModele: any;

  // Les modeles a afficher dans le select
  private modeles: ModeleDetail[];

  // Les colonnes a afficher dans le mat-table
  displayedColumns = ['CodeOption', 'NomOption', 'gestion'];

  // Le modele selectionné dans le mat-select
  modeleSelectionne: any;

  // Réference vers le mat-sort
  @ViewChild(MatSort) sort: MatSort;

  // Réference vers le mat-paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Constructeur de la classe, déclare uniquement les attributs
   * @param optionService
   * Il va permettre d'avoir les options a afficher
   * @param modalService
   * Un service qui va permettre d'ouvrir les boites de dialogues pour ajouter, supprimer et modifier
   * @param activatedroute
   * Il va permettre de récuperer le parametre passé en utl
   * @param modeleService
   * Il va permettre d'avoir les modeles pour le mat-select
   */
  constructor(private optionService: OptionService, private modalService: MatDialog,
              private activatedroute: ActivatedRoute,
              private modeleService: ModeleService,
              private toastr: ToastrManager,
              private dialogValidation: MatDialog) {
  }

  /**
   * récupere le parametre passé en url si il y'en a, et récupere les modeles et les options
   */
  ngOnInit() {

    try {
      this.codeModele = this.activatedroute.snapshot.params.CodeModele; /*récupérer le code modèle passé en paramètre dans l'url*/
    } catch {
      this.codeModele = null;
    }
    this.refreshData();

    // Récupération des modeles pour le mat-select
    this.modeleService.getModeles().subscribe(modeles => {
      this.modeles = modeles as ModeleDetail[];
    }, error => {
      // Probleme de connexion
      this.toastr.errorToastr(error);
    });
    this.refreshData();
  }

  /**
   * Récuperation des options au début
   */
  refreshData() {
    if ((this.codeModele !== '') && (this.codeModele != null)) {
      this.loading = true;
      this.optionService.getOptions(this.codeModele).subscribe(res => {
        this.dataSource.data = res as Option[];
        this.loading = false;
      }, error => {
        // Soit le modele n'existe pas, soit probleme de cnnexion
        this.toastr.errorToastr(error);
        this.loading = false;
      });
    }
  }

  /**
   * Changement des options lorsqu'on change le modéle
   * @param $event
   * L'evenement de changement
   */
  changerOptions($event) {
    this.codeModele = $event.value;
    this.refreshData();
  }
  /**
   * Supprimer une option, invoque le composant SupprimerOption
   * @param option
   * L'option a supprimer
   */
  supprimerOption(option) {
    const dialogRef: MatDialogRef<ConfirmationDialogComponent> = this.dialogValidation.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Voulez vous vraiment supprimer cette option?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.optionService.supprimerDuModele(option.CodeOption, this.codeModele).subscribe(() => {
          this.refreshData();
        });
      }
    });
  }

  /**
   * Ajouter une option, invoque le composant ajouterOption
   */
  ajouterOption() {

    if ((this.codeModele !== '') && (this.codeModele != null)) {
      // Ouverture de la boite de dialogue, composant Ajouter Option
      const dialogRef: MatDialogRef<AjouterOptionComponent> = this.modalService.open(AjouterOptionComponent, {
        width: '800px',
      });
      dialogRef.componentInstance.modele = this.codeModele;
      // Rafraichissement de la page apres fermeture de la boite de dialogue
      dialogRef.afterClosed().subscribe(() => {
        this.refreshData();
      });
    } else {
      this.toastr.infoToastr('veuillez choisir un modèle');
    }

  }

  /**
   *  Modifier une option, invoque le composant ModifierOption
   * @param option
   * L'option a modifier
   */
  modifierOption(option) {
    // Ouverture de la boite de dialogue, composant Modifier Option
    const dialogRef: MatDialogRef<ModifierOptionComponent> = this.modalService.open(ModifierOptionComponent,
      {
        width: '800px'});
    dialogRef.componentInstance.setData(option);

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

  getModele = () => {
    return this.codeModele;
  }
}


