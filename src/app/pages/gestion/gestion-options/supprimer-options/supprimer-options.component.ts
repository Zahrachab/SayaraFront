import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {OptionService} from '../../../../services/option.service';
import {Option} from '../../../../services/entites/option.model';

@Component({
  selector: 'app-supprimer-options',
  templateUrl: './supprimer-options.component.html',
  styleUrls: ['./supprimer-options.component.scss']
})
/**
 *  Classe de suppression des options
 *  Implemente OnInit pour l'initialisation du composant
 *  @author CHABANE CHAOUCH Zahra, CHOUAKI Salim
 *
 */
export class SupprimerOptionsComponent implements OnInit {

  modele: string;
  option: Option;
  /**
   * Constructeur de la classe, déclare les attributs de la classe
   * @param dialogReference
   * Réference vers la boite de dialogue
   * @param optionService
   * Service qui va permettre d'envoyer la requete de suppression de l'option
   * @param data
   * Les données récues du composant gestion-option : l'option a supprimer
   */
  constructor(private dialogReference: MatDialogRef<SupprimerOptionsComponent>,
              private optionService: OptionService) { }


  /**
   * ne fait rien
   */
  ngOnInit() {
  }

  /**
   *  Fermer la boite de dialogue
   */
  fermer() {
    this.dialogReference.close();
  }

  /**
   * Supprimer l'option
   */
  supprimerOption() {
    this.optionService.supprimerDuModele(this.option.CodeOption, this.modele).subscribe(() => {
      this.fermer();
    });
  }
}
