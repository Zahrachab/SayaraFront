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
export class ModifierModeleComponent implements OnInit {

  formulaire: FormGroup;

  constructor(private dialogReference: MatDialogRef<ModifierModeleComponent>, private modeleservice: ModeleService,
              private optionservice: OptionService,
              @Inject(MAT_DIALOG_DATA) private data: any, private constructeurFormulaire: FormBuilder) {
  }

  ngOnInit() {
    this.formulaire = this.constructeurFormulaire.group({
      code: '',
      description: '',
      nom: '',
      options: this.constructeurFormulaire.array([])
    });

    for (const item of this.data.modele.options) {
      const option = this.constructeurFormulaire.group({
        codeOption: [item.CodeOption],
        nomOption: [item.NomOption]
      });
      this.optionsFormulaire.push(option);
    }
    this.formulaire.valueChanges.subscribe();
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

  supprimerOption(i) {
    this.optionsFormulaire.removeAt(i);
  }

  modifierModele() {
    let trouv = false;
    this.modeleservice.modifier(this.data.modele.CodeModele, this.formulaire.value.nom).subscribe((res) => {
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
