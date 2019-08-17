import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {StockVehicule} from '../services/entites/stockVehicule.model';
import {Vehicule} from '../services/entites/Vehicule.model';

@Injectable()
export class StockServiceMock {
  constructor() {
  }

  /*Récupérer le stock d'une version */

  public getStockVersion(codeVersion) : Observable<StockVehicule[]> {
    return Observable.of([
      {
        vehicules: [{
          NumChassis: '123444'
        }],
        CodeHexa: '6578990',
        Montant: '12300000',
        quantite: 34,
        options: [
          {
            NomOption: 'Air bag'
          },
          {
            NomOption: 'Vitres électriques'
          }]
      },
      {
        vehicules: [{
          NumChassis: '1986R44'
        }],
        CodeHexa: '6578990',
        Montant: '12300000',
        quantite: 34,
        options: [
          {
            NomOption: 'option1'
          },
          {
            NomOption: 'option2'
          },
          {
            NomOption: 'option3'
          }]
      },

    ]);
  }


  public getVehiculesDispo(codeVersion: String, codeCouleur: String, options: Array<String>): Observable<Vehicule[]> {
    return Observable.of([
      {
        NumChassis: '0987654',
        Montant : '1300000',
        Options: [
          {
            CodeOption: '32',
            NomOption: 'option1',
            rel_vehic_opt	: {}
          }]
      },
      {
        NumChassis: '0987654',
        Montant : '1300000',
        Options: [
          {
            CodeOption: '32',
            NomOption: 'option1',
            rel_vehic_opt	: {}
          }]
      },
    ]);
  }
}
