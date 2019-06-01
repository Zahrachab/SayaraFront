import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ModeleDetail} from '../services/entites/modeleDetail.model';

@Injectable()
export class ModeleServiceMock {
  constructor() {
  }

  /*Récupérer tous les modèles d'une marque */
  getModeles(): Observable<ModeleDetail[]> {


    return Observable.of( [{
        CodeModele: 'jj',
        NomModele: 'kk',
        CodeMarque: '',
        versions: [{
          CodeVersion: '',
          CodeModele: '',
          NomVersion: ''}],
        options: [{
          CodeOption : '',
          NomOption: '',
          Checked: false,
          rel_ver_opt: {
            idRelVerOpt: '',
            CodeVersion: '',
            CodeOption: '',
          }
        }],
        couleurs: [{
          CodeCouleur: '',
          NomCouleur: '',
          CodeHexa: '',
          Checked: true,
        }]
      }]
    );

  }

  getModele(codeModele): Observable<ModeleDetail> {
    return Observable.of( {
      CodeModele: 'jj',
      NomModele: 'kk',
      CodeMarque: '',
      versions: [{
      CodeVersion: '',
      CodeModele: '',
      NomVersion: ''}],
      options: [{
      CodeOption : '',
      NomOption: '',
      Checked: false,
      rel_ver_opt: {
        idRelVerOpt: '',
        CodeVersion: '',
        CodeOption: '',
      }
    }],
      couleurs: [{
      CodeCouleur: '',
      NomCouleur: '',
      CodeHexa: '',
      Checked: true,
    }]
    }
);

  }

  ajouter(code: string, designation: string) {

  }

  supprimerModele(codeModele) {

  }

  modifier(code: string, nom: string) {

  }
}
