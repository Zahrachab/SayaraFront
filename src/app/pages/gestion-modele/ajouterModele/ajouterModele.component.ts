import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormGroup, FormArray} from '@angular/forms';
import { MAT_DIALOG_DATA} from '@angular/material';
import {ModeleServiceService} from '../../../services/modele-service.service';
import {OptionService} from '../../../services/option.service';
import {VersionService} from '../../../services/version.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
  styleUrls: ['modal.component.css']
})
export class ModalComponent implements OnInit {

  options: Array<string> = ['option1', 'option2', 'option3'];
  formulaire: FormGroup;
  constructor(private constructeurFormulaire: FormBuilder,
              private modeleservice: ModeleServiceService,
              private optionservice: OptionService,
              private versionservice: VersionService,
              ) {}

  ngOnInit() {
      const option = this.constructeurFormulaire.group({
          codeOption: [],
          nomOption: []
      });
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

  ajouterOptionsFormulaires() {
      const tableauOptions = this.options.map(element => {
            return this.constructeurFormulaire.control(false);
      });
      return this.constructeurFormulaire.array(tableauOptions);
  }

  get tableauOptions() {
    return this.formulaire.get('options') as FormArray;
  }

  onSubmit() {
    this.modeleservice.ajouter(this.formulaire.value.code, this.formulaire.value.nom);
    this.versionservice.ajouter(this.formulaire.value.code + JSON.parse(localStorage.getItem('utilisateur')).utilfab.Fabricant,
      this.formulaire.value.nom, this.formulaire.value.code);

    for (let i = 0; i < this.formulaire.value.options.length; i++) {
      this.optionservice.ajouter(this.formulaire.value.options[i].codeOption, this.formulaire.value.options[i].nomOption,
        this.formulaire.value.code + JSON.parse(localStorage.getItem('utilisateur')).utilfab.Fabricant);
      }
    }
}
