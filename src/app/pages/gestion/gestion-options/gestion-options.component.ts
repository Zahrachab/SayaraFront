import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {OptionService} from '../../../services/option.service';
import {ModeleDetail} from '../../../services/entites/modeleDetail.model';
import {ModeleService} from '../../../services/modele.service';
import {SupprimerOptionsComponent} from './supprimer-options/supprimer-options.component';
import {AjouterOptionComponent} from './ajouter-option/ajouter-option.component';
import {ModifierOptionComponent} from './modifier-option/modifier-option.component';
import {Option} from '../../../services/entites/option.model';

@Component({
  selector: 'app-gestion-options',
  templateUrl: './gestion-options.component.html',
  styleUrls: ['./gestion-options.component.scss']
})
export class GestionOptionsComponent implements OnInit, AfterViewInit {
  public dataSource = new MatTableDataSource<Option>();
  private codeModele: any;
  private modeles: ModeleDetail[];
  interval: any;
  displayedColumns = ['CodeOption', 'NomOption', 'gestion'];
  modeleSelectionne: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private optionService: OptionService, private modalService: MatDialog,
              private activatedroute: ActivatedRoute, private modeleService: ModeleService) {
  }

  ngOnInit() {
    try {
      this.codeModele = this.activatedroute.snapshot.params.CodeModele; /*récupérer le code modèle passé en paramètre dans l'url*/
      this.modeleSelectionne = this.activatedroute.snapshot.params.CodeModele;
    } catch {
      this.codeModele = null;
    }
    this.modeleService.getModeles().subscribe(modeles => {
      this.modeles = modeles as ModeleDetail[];
    });
    this.refreshData();
  }

  refreshData() {
    if ((this.codeModele !== '') && (this.codeModele != null)) {
      this.optionService.getOptions(this.codeModele).subscribe(res => {
        this.dataSource.data = res as Option[];
      });
    }
  }

  changerOptions($event) {
    if ((this.codeModele !== '') || (this.codeModele != null)) {
      this.optionService.getOptions($event.value).subscribe(res => {
        this.dataSource.data = res as Option[];
      });
    }
  }

  supprimerOption(option) {
    this.modalService.open(SupprimerOptionsComponent, {width: '800px', data: {option, modele: this.modeleSelectionne}});
  }

  ajouterOption() {
    this.modalService.open(AjouterOptionComponent, {
      width: '800px',
      height: '40%',
      data: {modele: this.modeleSelectionne}
    });
  }

  modifierOption(option) {
    this.modalService.open(ModifierOptionComponent, {width: '800px', height: '40%', data: {option}});
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  appliquerFiltre = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}


