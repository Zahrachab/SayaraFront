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
         CodeVersion: 'jj',
         CodeModele: '',
         NomVersion: 'kk',
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
           rel_ver_coul: {
             idRelVerCoul: 'string',
             CodeVersion: 'string',
             CodeCouleur: 'string'
           },
         }],
         images: [{
           idImage: '',
           CodeImage: '',
           Type: '',
           CheminImage: ''
         }]
       }
       ]
     );
  }

  supprimerVersion(codeVersion) {
   return true;
  }

  modifierVersion(code: string, designation: string, codeVersion: string) {
    return true;
  }


}
