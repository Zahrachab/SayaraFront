import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {ModeleService} from '../../../../services/modele.service';
import {OptionService} from '../../../../services/option.service';
import {VersionService} from '../../../../services/version.service';

@Component({
  selector: 'app-modal',
  templateUrl: './ajouterModele.component.html',
  styleUrls: ['ajouterModele.component.css']
})
export class AjouterModeleComponent implements OnInit {

  options: Array<string> = ['option1', 'option2', 'option3'];
  formulaire: FormGroup;

  constructor(private constructeurFormulaire: FormBuilder,
              private modeleservice: ModeleService,
              private optionservice: OptionService,
              private versionservice: VersionService,
  ) {
  }

  ngOnInit() {
    this.formulaire = this.constructeurFormulaire.group({
      code: '',
      description: '',
      nom: '',
      //     options: this.ajouterOptionsFormulaires()
      options: this.constructeurFormulaire.array([])
    });


    this.formulaire.valueChanges.subscribe();
  }

  get optionsFormulaire() {
    return this.formulaire.get('options') as FormArray;
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


  onSubmit() {
    this.modeleservice.ajouter(this.formulaire.value.code, this.formulaire.value.nom);
    this.versionservice.ajouter(this.formulaire.value.code + JSON.parse(localStorage.getItem('utilisateur')).utilfab.Fabricant,
      this.formulaire.value.nom, this.formulaire.value.code);

    for (const option of this.formulaire.value.options) {
      this.optionservice.ajouter(option.codeOption, option.nomOption,
        this.formulaire.value.code + JSON.parse(localStorage.getItem('utilisateur')).utilfab.Fabricant);
    }
  }
}
