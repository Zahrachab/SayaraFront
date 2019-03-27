import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ModeleService} from '../../../../services/modele.service';
import {OptionService} from '../../../../services/option.service';

@Component({
  selector: 'app-modifier-modele',
  templateUrl: './modifier-modele.component.html',
  styleUrls: ['./modifier-modele.component.scss']
})
/**
 *  Classe de modification des modeles de véhicules
 *  Implemente OnInit pour l'initialisation du composant
 *  @author CHABANE CHAOUCH Zahra, CHOUAKI Salim
 *
 */
export class ModifierModeleComponent implements OnInit {
  // Réference vers le formulaire html
  formulaire: FormGroup;

  /**
   * Constructeur de la classe, déclare les attributs de la classe
   * @param dialogReference
   * Réference vers la boite de dialogue
   * @param modeleservice
   * Service qui va permettre d'envoyer la requete de modification de modele
   * @param optionservice
   * Service qui va permettre d'envoyer les requetes d'insertions et de suppressions des modeles
   * @param data
   * Les données récues du composant gestion-modele : le modele a modifier
   * @param constructeurFormulaire
   * De type FormBuilder pour construire le formulaire
   */
  constructor(private dialogReference: MatDialogRef<ModifierModeleComponent>, private modeleservice: ModeleService,
              private optionservice: OptionService,
              @Inject(MAT_DIALOG_DATA) private data: any, private constructeurFormulaire: FormBuilder) {
  }

  /**
   *  Executé a l'initialisation du composant, Construit le formulaire et fait la lsiasion avec le html
   */
  ngOnInit() {
    // Construction du formulaire
    this.formulaire = this.constructeurFormulaire.group({
      code: this.data.modele.CodeModele,
      description: '',
      nom: this.data.modele.NomModele,
      options: this.constructeurFormulaire.array([])
    });

    // Initialisation des options
    for (const item of this.data.modele.options) {
      const option = this.constructeurFormulaire.group({
        codeOption: [item.CodeOption],
        nomOption: [item.NomOption]
      });
      this.optionsFormulaire.push(option);
    }
    // Liaison avec le Html
    this.formulaire.valueChanges.subscribe();
  }
  /**
   * Ajouter une option compatible avec le modele
   */
  ajouterOption() {
    const option = this.constructeurFormulaire.group({
      codeOption: [],
      nomOption: []
    });
    this.optionsFormulaire.push(option);
  }

  /**
   * Les options ajoutées dans le formulaire html
   */
  get optionsFormulaire() {
    return this.formulaire.get('options') as FormArray;
  }

  /**
   * Supprimer une option du formulaire
   * @param i
   * L'indice de l'iption a supprimer
   */
  supprimerOption(i) {
    this.optionsFormulaire.removeAt(i);
  }

  /**
   * Modifie un modele, en modifiant le nom et les options et les couelurs
   */
  modifierModele() {
    let trouv = false;
    // Modifier un modele
    this.modeleservice.modifier(this.data.modele.CodeModele, this.formulaire.value.nom).subscribe((res) => {
        this.dialogReference.close();
      }
    );
    // Modification des options
    for (const option of this.formulaire.value.options) {
      for (const option2 of this.data.modele.options) {
        if (option.codeOption === option2.CodeOption) {
          trouv = true;
        }
      }
      if (trouv !== true) {  // Si on a rajouté une option
        // Inserer l'option et l'association
         this.optionservice.ajouterOptionModele(option.codeOption, option.nomOption, this.data.modele.CodeModele);
      }
      trouv = false;
    }

    for (const option of this.data.modele.options) {
          for (const option2 of this.formulaire.value.options) {
              if (option.CodeOption === option2.codeOption) {
                trouv = true;
              }
          }
          if (trouv !== true) {
            // supprimer l'association avec le modele
            this.optionservice.supprimerDuModele(option.CodeOption, this.data.modele.CodeModele).subscribe(() => {
            });
          }
          trouv = false;
    }
  }
}
