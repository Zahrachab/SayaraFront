
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
        CodeOption: '',
        NomOption: '',
        Checked: false,
        rel_ver_opt: {
          idRelVerOpt: '',
          CodeVersion: '',
          CodeOption: ''
        }
      },
      {
        CodeOption: '',
        NomOption: '',
        Checked: false,
        rel_ver_opt: {
          idRelVerOpt: '',
          CodeVersion: '',
          CodeOption: ''
        }
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
