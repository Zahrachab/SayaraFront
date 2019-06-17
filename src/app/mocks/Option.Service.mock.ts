
import { Injectable } from '@angular/core';
import {observable, Observable} from 'rxjs';
import {Option} from '../services/entites/option.model';
import {ModeleDetail} from '../services/entites/modeleDetail.model';

@Injectable()
export class OptionServiceMock {
  constructor() {
  }

  ajouter(code: string, designation: string, codeVersion: string) {
    return true;
  }

  supprimer(code: string, codeVersion: string) {
      return true;

  }

  ajouterOptionModele(code: string, designation: string, codeModele: string) {
   return true;
  }

  getOptions(codeModele): Observable<Option[]> {
    return Observable.of([
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
      ]);

  }

  supprimerDuModele(code: string, codeModele: string) {
    return true;
  }


  modifier(code: string, nom: string) {
    return true;
  }



}
