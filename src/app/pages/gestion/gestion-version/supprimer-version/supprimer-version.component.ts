import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {VersionService} from '../../../../services/version.service';

@Component({
  selector: 'app-supprimer-version',
  templateUrl: './supprimer-version.component.html',
  styleUrls: ['./supprimer-version.component.scss']
})

/**
 *  Classe de suppression des versions
 *  Implemente OnInit pour l'initialisation du composant
 *  @author CHABANE CHAOUCH Zahra, CHOUAKI Salim
 *
 */
export class SupprimerVersionComponent implements OnInit {

  /**
   * Constructeur de la classe, déclare les attributs de la classe
   * @param dialogReference
   * Réference vers la boite de dialogue
   * @param versionService
   * Service qui va permettre d'envoyer la requete de suppression de version
   * @param data
   * Les données récues du composant gestion-version : la version a supprimer
   */
  constructor(private dialogReference: MatDialogRef<SupprimerVersionComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any, private versionService: VersionService) { }

  /**
   * Ne fait rien
   */
  ngOnInit() {
  }

  /**
   * Supprimer une version
   */
  supprimerVersion() {
    this.versionService.supprimerVersion(this.data.version.CodeVersion).subscribe(() => {
       this.fermer();
    });
  }


  /**
   * Fermer la boite de dialogue
   */
  fermer() {
    this.dialogReference.close();
  }
}
