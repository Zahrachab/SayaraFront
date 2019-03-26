import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {ModeleService} from '../../../../services/modele.service';
import {OptionService} from '../../../../services/option.service';
import {VersionService} from '../../../../services/version.service';
import {CouleurService} from '../../../../services/couleur.service';
import {Couleur} from '../../../../services/entites/couleur.model';
import {ModeleDetail} from '../../../../services/entites/modeleDetail.model';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-modal',
  templateUrl: './ajouterModele.component.html',
  styleUrls: ['ajouterModele.component.scss']
})
export class AjouterModeleComponent implements OnInit {
  private couleursMap;
  private couleursArray: Array<Couleur> = [];
  private couleursChecked: Array<Couleur> = [];
  constructor(private constructeurFormulaire: FormBuilder,
              private modeleService: ModeleService,
              private optionService: OptionService,
              private versionService: VersionService,
              private couleurService: CouleurService,
              public dialogRef: MatDialogRef<AjouterModeleComponent>
  ) {
  }

  get optionsFormulaire() {
    return this.formulaire.get('options') as FormArray;
  }

  get couleursFormulaire() {
    return this.formulaire.get('couleurs') as FormArray;
  }

  options: Array<string> = ['option1', 'option2', 'option3'];
  couleurs: Array<string> = ['couleur1', 'couleur2', 'couleur3'];
  formulaire: FormGroup;


  ngOnInit() {
    this.formulaire = this.constructeurFormulaire.group({
      code: '',
      description: '',
      nom: '',
      //     options: this.ajouterOptionsFormulaires()
      options: this.constructeurFormulaire.array([]),
      couleurs: this.constructeurFormulaire.array([]),
    });


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
      console.log(this.couleursArray);
    });
  }


    ajouterOption() {
    const option = this.constructeurFormulaire.group({
      codeOption: [],
      nomOption: []
    });
    this.optionsFormulaire.push(option);
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


  ajouterModele() {
    this.modeleService.ajouter(this.formulaire.value.code, this.formulaire.value.nom);
    this.versionService.ajouter(this.formulaire.value.code + JSON.parse(localStorage.getItem('utilisateur')).utilfab.Fabricant,
      this.formulaire.value.nom, this.formulaire.value.code);

    for (const option of this.formulaire.value.options) {
      this.optionService.ajouterOptionModele(option.codeOption, option.nomOption,
        this.formulaire.value.code);
    }

    for (const couleur of this.couleursChecked) {
      console.log(couleur.CodeCouleur + ' ' + couleur.NomCouleur + ' ' + couleur.CodeHexa);
      this.couleurService.ajouterCouleurModele(String(couleur.CodeCouleur), String(couleur.NomCouleur), String(couleur.CodeHexa),
        this.formulaire.value.code);
    }


    for (const couleur of this.formulaire.value.couleurs) {
      this.couleurService.ajouterCouleurModele(couleur.codeCouleur, couleur.nomCouleur, couleur.codeHexa,
        this.formulaire.value.code);
    }
    this.dialogRef.close();
  }
}
