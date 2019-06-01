import { Injectable } from '@angular/core';
import {observable, Observable} from 'rxjs';
import {Couleur} from '../services/entites/couleur.model';

@Injectable()
export class CouleurServiceMock {
  constructor() {
  }

  /* supprimer une couleur d'un modèle */
  supprimerCouleurModele(code: string, codeModele: string) {
    return true;
  }

  /* ajouter une couleur et l'associer à un modèle donnée */
  ajouterCouleurModele(code: string, designation: string, hexa: string, codeModele: string) {
    return true;
  }

  /* récupérer les couleurs associées à un modèle */
  getCouleurs(codeModele): Observable<Couleur[]> {
     return Observable.of (
       [{
         CodeCouleur: '',
         NomCouleur: '',
         CodeHexa: '',
         Checked: true
       },
    {
      CodeCouleur: '',
        NomCouleur: '',
      CodeHexa: '',
      Checked: true
    }
    ]);

  }
  /* Modifier un couleur */
  modifierCouleur(code: string, nom: string, codeHexa: string) {
    return true;
  }

  /* récupérer la liste des couleurs associés à tous les modèles d'une marque */
  getGouleursMarque(): any {
    return 1;
  }



}
