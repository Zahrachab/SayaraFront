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
         CodeVersion: '100015',
         CodeModele: '1',
         NomVersion: 'GT Line',
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
           }
         ],
         couleurs: [{
           CodeCouleur: '1000',
           NomCouleur: 'Gris',
           CodeHexa: '#3456ff',
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
       },
       {
         CodeVersion: '89451',
         CodeModele: '87651',
         NomVersion: 'RS',
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
           }
         ],
         couleurs: [{
           CodeCouleur: '1000',
           NomCouleur: 'Gris',
           CodeHexa: '#3456ff',
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
       ]);
  }

  supprimerVersion(codeVersion) {
   return true;
  }

  modifierVersion(code: string, designation: string, codeVersion: string) {
    return true;
  }


}
