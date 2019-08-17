
import { Injectable } from '@angular/core';
import {observable, Observable} from 'rxjs';
import {Option} from '../services/entites/option.model';
import {ModeleDetail} from '../services/entites/modeleDetail.model';
import {OptionDetail} from '../services/entites/optionDetail.model';

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

  public getOptions(codeModele): Observable<Option[]> {
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


  public getOptionsVersion(codeVersion): Observable<Option[]> {
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

  public getOptionsWithLigneTarifs(codeModele) : Observable<OptionDetail[]> {
    return Observable.of([
      {
        CodeOption: '10',
        NomOption: 'radar avant',
        CodeModele: '1',
        NomModele: 'Golf',
        rel_mod_opt: {
          CodeModele: '1'
        },
        lignetarif: {
          idLigneTarif: 2,
          Type: 2,
          Code: '23',
          DateDebut: '',
          DateFin: '',
          Prix: 12000
        }
      },

    ]);
  }

  supprimerDuModele(code: string, codeModele: string) {
    return true;
  }


  modifier(code: string, nom: string) {
    return true;
  }



}
