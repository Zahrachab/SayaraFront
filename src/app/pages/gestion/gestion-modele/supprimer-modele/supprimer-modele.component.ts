import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ModeleService} from '../../../../services/modele.service';

@Component({
  selector: 'app-supprimer-modele',
  templateUrl: './supprimer-modele.component.html',
  styleUrls: ['./supprimer-modele.component.scss']
})
export class SupprimerModeleComponent implements OnInit {

  constructor(private dialogReference: MatDialogRef<SupprimerModeleComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any, private modeleService: ModeleService) { }

  ngOnInit() {
  }

  supprimerModele() {
      this.modeleService.supprimerModele(this.data.modele.CodeModele).subscribe(() => {
          this.fermer();
      });
  }


  fermer() {
    this.dialogReference.close();
  }

}
