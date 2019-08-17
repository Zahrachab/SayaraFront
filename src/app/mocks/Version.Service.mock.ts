import { Injectable } from '@angular/core';
import {observable, Observable} from 'rxjs';
import {Couleur} from '../services/entites/couleur.model';
import {HttpHeaders} from '@angular/common/http';
import {VersionDetail} from '../services/entites/versionDetail.model';

@Injectable()
export class VersionServiceMock {
  constructor() {
  }

  ajouter(code: string, designation: string, model: string) {
   return true;
  }

  getVersions(codeModele): Observable<VersionDetail[]> {
     return Observable.of ([
       {
          CodeVersion: '123',
          CodeModele: '1',
          NomVersion: 'Golf série 6',
          options:  [{
            CodeOption: '12',
            NomOption: 'AirBag',
            Checked: false,
            rel_ver_opt: {
              idRelVerOpt: '',
              CodeVersion: '',
              CodeOption: '',
            }
          }],
          couleurs: [{
            CodeCouleur: '89',
            NomCouleur: 'Noir',
            CodeHexa: 'ffffff',
            Checked: false,
            CheminImage: '',
            lignetarif: {
              idLigneTarif: 12,
                Type: 2,
                Code: '23',
                DateDebut: '',
                DateFin: '',
                Prix: 12300
            },
            rel_ver_coul: {
              idRelVerCoul: '',
              CodeVersion: '',
              CodeCouleur: '',
            }
          }],
          images :[{
            idImage: '1',
            CodeImage: '12',
            Type: '',
            CheminImage: '',
          }],
          lignetarif: {
            idLigneTarif: 2,
              Type: 2,
              Code: '1',
              DateDebut: '',
              DateFin: '',
              Prix: 65500
          }
       }
       ]);
  }

  supprimerVersion(codeVersion) {
   return true;
  }

  modifierVersion(code: string, designation: string, codeVersion: string) {
    return true;
  }


}
