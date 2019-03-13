import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ModeleService} from '../../../../services/modele.service';
import {OptionService} from '../../../../services/option.service';
import {VersionService} from '../../../../services/version.service';
import {Option} from '../../../../services/entites/option.model';
import {MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-ajouter-version',
  templateUrl: './ajouter-version.component.html',
  styleUrls: ['./ajouter-version.component.scss']
})
export class AjouterVersionComponent implements OnInit {

  private options: Option[];
  private formulaire: FormGroup;
  public codeModele: string;
  public optionsChoisies: Array<Option> = [];

  constructor(private constructeurFormulaire: FormBuilder,
              private modeleservice: ModeleService,
              private optionservice: OptionService,
              private versionservice: VersionService,
              public dialogRef: MatDialogRef<AjouterVersionComponent>
  ) {
  }

  ngOnInit() {
    this.optionservice.getOptions(this.codeModele).subscribe( opts => this.options = opts as Option[]);
    this.formulaire = this.constructeurFormulaire.group({
      code: '',
      nom: '',
    });
    this.formulaire.valueChanges.subscribe();
  }

  gererOptions(event, option) {
      option.checked = !option.checked;
      console.log(event, option);
      this.optionsChoisies.push(option);
    }

    onSubmit() {
    this.versionservice.ajouter(this.formulaire.value.code + JSON.parse(localStorage.getItem('utilisateur')).utilfab.Fabricant,
      this.formulaire.value.nom, this.codeModele);

    for (const option of this.options) {
      this.optionservice.ajouter(String(option.CodeOption),  String(option.NomOption),
        this.formulaire.value.code + JSON.parse(localStorage.getItem('utilisateur')).utilfab.Fabricant);
    }
  }
}
