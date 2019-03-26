import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OptionService} from '../../../../services/option.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-ajouter-option',
  templateUrl: './ajouter-option.component.html',
  styleUrls: ['./ajouter-option.component.scss']
})
export class AjouterOptionComponent implements OnInit {

  formulaire: FormGroup;

  constructor(private constructeurFormulaire: FormBuilder, private optionservice: OptionService,
              @Inject(MAT_DIALOG_DATA) private data: any, private dialogReference: MatDialogRef<AjouterOptionComponent>) { }

  ngOnInit() {
    this.formulaire = this.constructeurFormulaire.group({
      code: '',
      nom: '',
    });
    this.formulaire.valueChanges.subscribe();
  }

  ajouterOption() {
    this.optionservice.ajouterOptionModele(this.formulaire.value.code, this.formulaire.value.nom,
      this.data.modele);
    this.fermer();
  }

  fermer() {
    this.dialogReference.close();
  }
}
