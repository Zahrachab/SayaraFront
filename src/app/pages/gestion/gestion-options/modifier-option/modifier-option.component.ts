import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {OptionService} from '../../../../services/option.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-modifier-option',
  templateUrl: './modifier-option.component.html',
  styleUrls: ['./modifier-option.component.scss']
})
export class ModifierOptionComponent implements OnInit {

  formulaire: FormGroup;

  constructor(private constructeurFormulaire: FormBuilder,
              private dialogReference: MatDialogRef<ModifierOptionComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any, private optionService: OptionService) { }

  ngOnInit() {
    this.formulaire = this.constructeurFormulaire.group({
      code: this.data.option.CodeOption,
      nom: this.data.option.NomOption,
    });
    this.formulaire.valueChanges.subscribe();
  }

  fermer() {
    this.dialogReference.close();
  }

  modifierOption() {
    this.optionService.modifier(this.data.option.CodeOption, this.formulaire.value.nom).subscribe((res) => {
          this.fermer();
      }
    );

  }
}
