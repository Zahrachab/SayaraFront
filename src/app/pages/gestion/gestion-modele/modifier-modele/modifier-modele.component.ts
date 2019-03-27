import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ModeleService} from '../../../../services/modele.service';
import {OptionService} from '../../../../services/option.service';
import {ModeleDetail} from '../../../../services/entites/modeleDetail.model';
import {Couleur} from '../../../../services/entites/couleur.model';

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
  private couleursMap;
  private couleursArray: Array<Couleur> = [];
  private couleursChecked: Array<Couleur> = [];
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
  constructor(private dialogReference: MatDialogRef<ModifierModeleComponent>, private modeleService: ModeleService,
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
      options: this.constructeurFormulaire.array([]),
      options1: this.constructeurFormulaire.array([]),
      couleurs: this.constructeurFormulaire.array([]),
    });

    this.chargerCouleurs();

    // Initialisation des options
    for (const item of this.data.modele.options) {
      const option = this.constructeurFormulaire.group({
        codeOption: [item.CodeOption],
        nomOption: [item.NomOption]
      });
      this.options1Formulaire.push(option);
    }
    // Liaison avec le Html
    this.formulaire.valueChanges.subscribe();
  }
  /**
   * Ajouter une option compatible avec le modele
   */

  chargerCouleurs() {
    this.formulaire.valueChanges.subscribe();
    /* récupérer les couleurs des autres modèles déjà existants dans la marque */
    this.couleursMap = new Map();
    let modeles;
    this.modeleService.getModeles().subscribe(res => {
      modeles = res as ModeleDetail[];
      for (let i = 0; i < modeles.length; i++) {
        const couleurs = modeles[i].couleurs as Couleur[];
        for (let j = 0; j < couleurs.length; j++) {
          if (!(this.couleursMap.has(couleurs[j].CodeCouleur))) {
            this.couleursMap.set(couleurs[j].CodeCouleur, couleurs[j]);
            this.couleursArray.push(couleurs[j]);
          }
        }
      }
    });
  }
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
  get options1Formulaire() {
    return this.formulaire.get('options1') as FormArray;
  }

  get couleursFormulaire() {
    return this.formulaire.get('couleurs') as FormArray;
  }

  supprimerOption(i) {
    this.optionsFormulaire.removeAt(i);
  }

  /**
   * Modifie un modele, en modifiant le nom et les options et les couelurs
   */
  ajouterCouleur() {
    const couleur = this.constructeurFormulaire.group({
      codeCouleur: [],
      nomCouleur: [],
    });
    this.couleursFormulaire.push(couleur);
  }

  gererCouleurs(event, clr) {
    clr.Checked = !clr.Checked;
    if (clr.Checked) {
      this.couleursChecked.push(clr);
    } else {
      this.couleursChecked.splice(clr);
    }
  }

  changerCouleur(i , color) {
    this.formulaire.value.couleurs[i].codeHexa = color;
  }


  supprimerCouleur(i) {
    this.couleursFormulaire.removeAt(i);
  }

  modifierModele() {
    let trouv = false;
    // Modifier un modele
    this.modeleService.modifier(this.data.modele.CodeModele, this.formulaire.value.nom).subscribe((res) => {
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
