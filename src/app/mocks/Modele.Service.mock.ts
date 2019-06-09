import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ModeleDetail} from '../services/entites/modeleDetail.model';

@Injectable()
export class ModeleServiceMock {
  constructor() {
  }

  /*Récupérer tous les modèles d'une marque */
  public getModeles(): Observable<ModeleDetail[]> {


    return Observable.of([
      {
          CodeModele: '87651',
          CodeMarque: '5',
          NomModele: 'Megane',
          versions: [
            {
              CodeVersion: '12454',
              CodeModele: '87651',
              NomVersion: 'Life'
            },
            {
              CodeVersion: '89451',
              CodeModele: '87651',
              NomVersion: 'RS'
            }
          ],
        options: [],
        couleurs: []
        },
        {
          CodeModele: '1',
          CodeMarque: '5',
          NomModele: 'Clio',
          versions: [
            {
              CodeVersion: '100015',
              CodeModele: '1',
              NomVersion: 'GT Line'
            },
            {
              CodeVersion: '100025',
              CodeModele: '1',
              NomVersion: 'Clio 1.2 L Life'
            },
            {
              CodeVersion: '100035',
              CodeModele: '1',
              NomVersion: 'Clio Symbole'
            },
            {
              CodeVersion: '100045',
              CodeModele: '1',
              NomVersion: 'Limited 2'
            }
          ],
          options: [
            {
              CodeOption: '11',
              NomOption: 'Toit en verre',
              rel_ver_opt: {
                idRelVerOpt: '',
                CodeVersion: '',
                CodeOption: '',
              },
              Checked: true
            },
            {
              CodeOption: '10',
              NomOption: 'radar avant',
              rel_ver_opt: {
                idRelVerOpt: '',
                CodeVersion: '',
                CodeOption: '',
              },
              Checked: true
            },
            {
              CodeOption: '11111',
              NomOption: 'Projecteurs Full LED ',
              rel_ver_opt: {
                idRelVerOpt: '',
                CodeVersion: '',
                CodeOption: '',
              },
              Checked: true
            },
            {
              CodeOption: '951357',
              NomOption: 'camera recul',
              rel_ver_opt: {
                idRelVerOpt: '',
                CodeVersion: '',
                CodeOption: '',
              },
              Checked: true
            },
            {
              CodeOption: '76544',
              NomOption: 'Carte Renault mains-libres',
              rel_ver_opt: {
                idRelVerOpt: '',
                CodeVersion: '',
                CodeOption: '',
              },
              Checked: true
            },
            {
              CodeOption: '800065',
              NomOption: 'Rétroviseurs rabattables autom',
              rel_ver_opt: {
                idRelVerOpt: '',
                CodeVersion: '',
                CodeOption: '',
              },
              Checked: true
            },
            {
              CodeOption: '6777798',
              NomOption: 'Condamnation électrique des po',
              rel_ver_opt: {
                idRelVerOpt: '',
                CodeVersion: '',
                CodeOption: '',
              },
              Checked: true
            },
            {
              CodeOption: '6312330',
              NomOption: 'Sièges Sport ',
              rel_ver_opt: {
                idRelVerOpt: '',
                CodeVersion: '',
                CodeOption: '',
              },
              Checked: true
            }
          ],
          couleurs: [
            {
              CodeCouleur: '1000',
              NomCouleur: 'Noir ',
              CodeHexa: '#444444',
              Checked: true
            },
            {
              CodeCouleur: '2000',
              NomCouleur: 'Rouge',
              CodeHexa: '#d14040',
              Checked: true
            },
            {
              CodeCouleur: '6500',
              NomCouleur: 'Jaune',
              CodeHexa: '#b0b914',
              Checked: true
            }
          ]
        },
      ]
    );

  }

  getModele(codeModele): Observable<ModeleDetail> {
    return Observable.of( {
      CodeModele: '1234',
      NomModele: 'Clio',
      CodeMarque: '50',
      versions: [{
      CodeVersion: '345',
      CodeModele: '1234',
      NomVersion: 'Clio série 4'}],
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
