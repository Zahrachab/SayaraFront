import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ModeleService} from '../../../../services/modele.service';

@Component({
  selector: 'app-supprimer-modele',
  templateUrl: './supprimer-modele.component.html',
  styleUrls: ['./supprimer-modele.component.scss']
})
/**
 *  Classe de suppression des modeles de véhicules
 *  Implemente OnInit pour l'initialisation du composant
 *  @author CHABANE CHAOUCH Zahra, CHOUAKI Salim
 *
 */
export class SupprimerModeleComponent implements OnInit {
  /**
   * Constructeur de la classe, déclare les attributs de la classe
   * @param dialogReference
   * Réference vers la boite de dialogue
   * @param modeleService
   * Service qui va permettre d'envoyer la requete de suppression de modele
   * @param data
   * Les données récues du composant gestion-modele : le modele a supprimer
   */
  constructor(private dialogReference: MatDialogRef<SupprimerModeleComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any, private modeleService: ModeleService) { }

  /**
   * ne fait rien
   */
  ngOnInit() {
  }

  /**
   *  Supprimer le modele
   */
  supprimerModele() {
      this.modeleService.supprimerModele(this.data.modele.CodeModele).subscribe(() => {
          this.fermer();
      });
  }

  /**
   *  Fermer la boite de dialogue
   */
  fermer() {
    this.dialogReference.close();
  }

}
