import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {ModeleService} from '../../../../services/modele.service';
import {OptionService} from '../../../../services/option.service';
import {VersionService} from '../../../../services/version.service';
import {CouleurService} from '../../../../services/couleur.service';

@Component({
  selector: 'app-modal',
  templateUrl: './ajouterModele.component.html',
  styleUrls: ['ajouterModele.component.scss']
})
export class AjouterModeleComponent implements OnInit {

  constructor(private constructeurFormulaire: FormBuilder,
              private modeleService: ModeleService,
              private optionService: OptionService,
              private versionService: VersionService,
              private couleurService: CouleurService,
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



  supprimerCouleur(i) {
    this.couleursFormulaire.removeAt(i);
  }


  onSubmit() {
    this.modeleService.ajouter(this.formulaire.value.code, this.formulaire.value.nom);
    for (const option of this.formulaire.value.options) {
      this.optionService.ajouterOptionModele(option.codeOption, option.nomOption,
        this.formulaire.value.code);
    }

    for (const couleur of this.formulaire.value.couleurs) {
      this.couleurService.ajouterCouleurModele(couleur.codeCouleur, couleur.nomCouleur,
        this.formulaire.value.code);
    }
  }
}
