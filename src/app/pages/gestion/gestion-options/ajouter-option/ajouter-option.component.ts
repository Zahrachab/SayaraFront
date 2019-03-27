import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OptionService} from '../../../../services/option.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-ajouter-option',
  templateUrl: './ajouter-option.component.html',
  styleUrls: ['./ajouter-option.component.scss']
})
/**
 *  Classe d'ajout des options
 *  Implemente OnInit pour l'initialisation du composant
 *  @author CHABANE CHAOUCH Zahra, CHOUAKI Salim
 *
 */
export class AjouterOptionComponent implements OnInit {
  // Réference vers le formulaire html
  formulaire: FormGroup;

  /**
   * Constructeur de la classe, déclare seulement les attributs privés de la classe
   * @param constructeurFormulaire
   * De type FormBuilder, Permet de construire des formulaire et de faire le binding avec html
   * @param optionservice
   * Pour envoyer la requete d'insertion des options compatibles avec le modele
   * @param dialogReference
   * Réference sur la boite de dialogue
   * @param data
   * Les données recues du composant gestion-option
   */
  constructor(private constructeurFormulaire: FormBuilder, private optionservice: OptionService,
              @Inject(MAT_DIALOG_DATA) private data: any, private dialogReference: MatDialogRef<AjouterOptionComponent>) { }


  /**
   *  Executé a l'initialisation du composant, Construit le formulaire et fait la lsiasion avec le html
   */
  ngOnInit() {
    // Construction du formulaire
    this.formulaire = this.constructeurFormulaire.group({
      code: '',
      nom: '',
    });
    // Liaison avec l'Html
    this.formulaire.valueChanges.subscribe();
  }

  /**
   * L'insertion d'une option
   */
  ajouterOption() {
    this.optionservice.ajouterOptionModele(this.formulaire.value.code, this.formulaire.value.nom,
      this.data.modele);
    this.fermer();
  }

  /**
   * Fermer la boite de dialogue
   */
  fermer() {
    this.dialogReference.close();
  }
}
