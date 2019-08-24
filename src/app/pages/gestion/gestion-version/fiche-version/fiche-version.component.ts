import { Component, OnInit } from '@angular/core';
import {ModeleDetail} from '../../../../services/entites/modeleDetail.model';
import {MatDialogRef} from '@angular/material';
import {VersionDetail} from '../../../../services/entites/versionDetail.model';

@Component({
  selector: 'app-fiche-version',
  templateUrl: './fiche-version.component.html',
  styleUrls: ['../ajouter-version/ajouter-version.component.scss']
})
export class FicheVersionComponent implements OnInit {
  public version: VersionDetail;
  // Les images sélectionnées
  private selectedFile: Array<ImageSnippet> = [];
  constructor(private dialogReference: MatDialogRef<FicheVersionComponent>) { }

  /**
   * Ne fait rien
   */
  ngOnInit() {
    this.loadFile();
  }

  // Récuperation des images de la version sélectionnée
  loadFile() {
    for (let j = 0; j < this.version.couleurs.length; j++) {
      this.selectedFile[j] = new ImageSnippet(null , null);
      this.selectedFile[j].src = String(this.version.couleurs[j].CheminImage);
    }
  }



  /**
   * Fermer la boite de dialogue
   */
  fermer() {
    this.dialogReference.close();
  }

}

// classe image
class ImageSnippet {
  status = 'init';
  new = true;
  id;
  constructor(public src: string, public file: File) {
  }
}
