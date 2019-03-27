import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {OptionService} from '../../../../services/option.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-modifier-option',
  templateUrl: './modifier-option.component.html',
  styleUrls: ['./modifier-option.component.scss']
})
/**
 *  Classe de modification des options
 *  Implemente OnInit pour l'initialisation du composant
 *  @author CHABANE CHAOUCH Zahra, CHOUAKI Salim
 *
 */
export class ModifierOptionComponent implements OnInit {
  // Réference vers le formulaire html
  formulaire: FormGroup;

  /**
   * Constructeur de la classe, déclare les attributs de la classe
   * @param dialogReference
   * Réference vers la boite de dialogue
   * @param optionService
   * Service qui va permettre d'envoyer les requetes d'insertions et de suppressions des modeles
   * @param data
   * Les données récues du composant gestion-modele : le modele a modifier
   * @param constructeurFormulaire
   * De type FormBuilder pour construire le formulaire
   */
  constructor(private constructeurFormulaire: FormBuilder,
              private dialogReference: MatDialogRef<ModifierOptionComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any, private optionService: OptionService) { }

  /**
   *  Executé a l'initialisation du composant, Construit le formulaire et fait la lsiasion avec le html
   */
  ngOnInit() {
    // Construction du formulaire
    this.formulaire = this.constructeurFormulaire.group({
      code: this.data.option.CodeOption,
      nom: this.data.option.NomOption,
    });
    // Liaison avec le Html
    this.formulaire.valueChanges.subscribe();
  }

  /**
   * Fermer la boite de dialogue
   */
  fermer() {
    this.dialogReference.close();
  }

  /**
   * Modifier une option
   */
  modifierOption() {
    this.optionService.modifier(this.data.option.CodeOption, this.formulaire.value.nom).subscribe((res) => {
          this.fermer();
      }
    );

  }
}
