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
export class ModifierModeleComponent implements OnInit {
  private couleursMap;
  private couleursArray: Array<Couleur> = [];
  private couleursChecked: Array<Couleur> = [];
  formulaire: FormGroup;

  constructor(private dialogReference: MatDialogRef<ModifierModeleComponent>, private modeleService: ModeleService,
              private optionservice: OptionService,
              @Inject(MAT_DIALOG_DATA) private data: any, private constructeurFormulaire: FormBuilder) {
  }

  ngOnInit() {
    this.formulaire = this.constructeurFormulaire.group({
      code: this.data.modele.CodeModele,
      description: '',
      nom: this.data.modele.NomModele,
      options: this.constructeurFormulaire.array([]),
      options1: this.constructeurFormulaire.array([]),
      couleurs: this.constructeurFormulaire.array([]),
    });

    this.chargerCouleurs();

    for (const item of this.data.modele.options) {
      const option = this.constructeurFormulaire.group({
        codeOption: [item.CodeOption],
        nomOption: [item.NomOption]
      });
      this.options1Formulaire.push(option);
    }
    this.formulaire.valueChanges.subscribe();
  }

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

  get optionsFormulaire() {
    return this.formulaire.get('options') as FormArray;
  }

  get options1Formulaire() {
    return this.formulaire.get('options1') as FormArray;
  }

  get couleursFormulaire() {
    return this.formulaire.get('couleurs') as FormArray;
  }

  supprimerOption(i) {
    this.optionsFormulaire.removeAt(i);
  }

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
    this.modeleService.modifier(this.data.modele.CodeModele, this.formulaire.value.nom).subscribe((res) => {
        this.dialogReference.close();
      }
    );

    for (const option of this.formulaire.value.options) {
      for (const option2 of this.data.modele.options) {
        if (option.codeOption === option2.CodeOption) {
          trouv = true;
        }
      }
      if (trouv !== true) {
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
