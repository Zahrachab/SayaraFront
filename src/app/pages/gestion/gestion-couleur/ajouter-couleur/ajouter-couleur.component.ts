import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Couleur} from '../../../../services/entites/couleur.model';
import {CouleurService} from '../../../../services/couleur.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmationDialogComponent} from '../../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-ajouter-couleur',
  templateUrl: './ajouter-couleur.component.html',
  styleUrls: ['../../gestion-version/ajouter-version/ajouter-version.component.scss']
})
export class AjouterCouleurComponent implements OnInit {
  private formulaire: FormGroup;
  private clr;
  couleur: Couleur;
  public codeModele: string;

  constructor(private constructeurFormulaire: FormBuilder,
              private couleurService: CouleurService,
              private dialogRef: MatDialogRef<AjouterCouleurComponent>,
              private dialogValidation: MatDialog
  ) {}

  ngOnInit() {

    this.formulaire = this.constructeurFormulaire.group({
      code: '',
      nom: '',
    });
    this.formulaire.valueChanges.subscribe();

  }

  onSubmit() {
    const dialogRef: MatDialogRef<ConfirmationDialogComponent> = this.dialogValidation.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Voulez vous confirmer l\'ajout?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.couleurService.ajouterCouleurModele(this.formulaire.value.code, this.formulaire.value.nom,
          this.clr, this.codeModele).subscribe(() => {
          this.dialogRef.close();
          }, error => {
          alert(error);
        });
      }
    });

  }



}
