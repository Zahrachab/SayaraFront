import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {OptionService} from '../../../../services/option.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Option} from '../../../../services/entites/option.model';

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
  option: Option;
  formValid = true;

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
              private optionService: OptionService) { }

  /**
   *  Executé a l'initialisation du composant, Construit le formulaire et fait la lsiasion avec le html
   */
  ngOnInit() {
    // Construction du formulaire
    this.formulaire = this.constructeurFormulaire.group({
      code: new FormControl({value: this.option.CodeOption, disabled: true}, Validators.required),
      nom:  new FormControl({value: this.option.CodeOption}, Validators.required),
    });
    // Liaison avec le Html
    this.formulaire.valueChanges.subscribe(() => {
      this.formValid = this.formulaire.valid;
    });
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
    this.optionService.modifier(this.option.CodeOption, this.formulaire.value.nom).subscribe((res) => {
          this.fermer();
      }, error => {
        // Erreur modification
        alert(error);
      }
    );
  }

  public getData() {
    return this.option;
  }
  public setData(data: Option) {
    this.option = data;
  }
}
