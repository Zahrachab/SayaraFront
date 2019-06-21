import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {ModeleDetail} from '../../../../services/entites/modeleDetail.model';

@Component({
  selector: 'app-fiche-modele',
  templateUrl: './fiche-modele.component.html',
  styleUrls: ['../../gestion-version/ajouter-version/ajouter-version.component.scss']
})
export class FicheModeleComponent implements OnInit {
  public modele: ModeleDetail;
  constructor(private dialogReference: MatDialogRef<FicheModeleComponent>) { }

  /**
   * Ne fait rien
   */
  ngOnInit() {
  }



  /**
   * Fermer la boite de dialogue
   */
  fermer() {
    this.dialogReference.close();
  }

}
