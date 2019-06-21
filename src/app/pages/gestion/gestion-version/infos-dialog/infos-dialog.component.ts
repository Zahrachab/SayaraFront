import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {VersionDetail} from '../../../../services/entites/versionDetail.model';

@Component({
  selector: 'app-infos-dialog',
  templateUrl: './infos-dialog.component.html',
  styleUrls: ['../ajouter-version/ajouter-version.component.scss']
})
export class InfosDialogComponent implements OnInit {
  public version: VersionDetail;
  constructor(private dialogReference: MatDialogRef<InfosDialogComponent>) { }

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
