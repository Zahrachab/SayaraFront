import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Vehicule} from '../../../services/entites/Vehicule.model';



@Component({
  selector: 'app-infos-dispo',
  templateUrl: './infos-dispo.component.html',
  styleUrls: ['../../gestion/gestion-version/ajouter-version/ajouter-version.component.scss']

})
export class InfosDispoComponent implements OnInit {


  // liste des véhicules correspondants
  public vehicules: Array<Vehicule> = null;

  constructor(private dialogReference: MatDialogRef<InfosDispoComponent>) { }

  ngOnInit() {
  }


  /**
   * Fermer la boite de dialogue
   */
  fermer() {
    this.dialogReference.close();
  }
}
