import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Commande} from '../services/entites/commande.model';


const data1: Commande[] = [
  {
    Date: '12/12/2018',
    Client: {
      NomClient: 'Chabane Zahra',
      WilayaClient: 'Alger',
      NumClient: '0543 76 87 98',
    },
    NomModele: 'Golf',
    NomVersion: 'Série 6',
    Prix: 1500000,
    Reserve: true,
    PrixPaye: 12000,
    Accepte: false,
    Refuse: false,
    annule: false
  },
  {
    Date: '12/12/2018',
    Client: {
      NomClient: 'Chabane Zahra',
      WilayaClient: 'Alger',
      NumClient: '0543 76 87 98',
    },
    NomModele: 'Golf',
    NomVersion: 'Série 6',
    Prix: 1500000,
    Reserve: false,
    PrixPaye: 0,
    Accepte: true,
    Refuse: false,
    annule: false
  },
  {
    Date: '12/12/2018',
    Client: {
      NomClient: 'Chabane Zahra',
      WilayaClient: 'Alger',
      NumClient: '0543 76 87 98',
    },
    NomModele: 'Dacia',
    NomVersion: 'Série 6',
    Prix: 1500000,
    Reserve: false,
    PrixPaye: 0,
    Accepte: false,
    Refuse: true,
    annule: false
  }
];

const data2: Commande[] = [
  {
    Date: '12/12/2018',
    Client: {
      NomClient: 'Chabane Zahra',
      WilayaClient: 'Alger',
      NumClient: '0543 76 87 98',
    },
    NomModele: 'Golf',
    NomVersion: 'Série 6',
    Prix: 1500000,
    Reserve: true,
    PrixPaye: 12000,
    Accepte: false,
    Refuse: false,
    annule: false
  },
  {
    Date: '12/12/2018',
    Client: {
      NomClient: 'Chabane Zahra',
      WilayaClient: 'Alger',
      NumClient: '0543 76 87 98',
    },
    NomModele: 'Golf',
    NomVersion: 'Série 6',
    Prix: 1500000,
    Reserve: true,
    PrixPaye: 12000,
    Accepte: false,
    Refuse: false,
    annule: false
  },
  {
    Date: '12/12/2018',
    Client: {
      NomClient: 'Chabane Zahra',
      WilayaClient: 'Alger',
      NumClient: '0543 76 87 98',
    },
    NomModele: 'Golf',
    NomVersion: 'Série 6',
    Prix: 1500000,
    Reserve: true,
    PrixPaye: 12000,
    Accepte: false,
    Refuse: false,
    annule: false
  },
  {
    Date: '12/12/2018',
    Client: {
      NomClient: 'Chabane Zahra',
      WilayaClient: 'Alger',
      NumClient: '0543 76 87 98',
    },
    NomModele: 'Golf',
    NomVersion: 'Série 6',
    Prix: 1500000,
    Reserve: true,
    PrixPaye: 120000,
    Accepte: false,
    Refuse: false,
    annule: false
  },
  {
    Date: '12/12/2018',
    Client: {
      NomClient: 'Chabane Zahra',
      WilayaClient: 'Alger',
      NumClient: '0543 76 87 98',
    },
    NomModele: 'Dacia',
    NomVersion: 'Série 6',
    Prix: 1500000,
    Reserve: true,
    PrixPaye: 120000,
    Accepte: false,
    Refuse: false,
    annule: false
  }
];


const data3: Commande[] = [
  {
    Date: '12/12/2018',
    Client: {
      NomClient: 'Chabane Zahra',
      WilayaClient: 'Alger',
      NumClient: '0543 76 87 98',
    },
    NomModele: 'Golf',
    NomVersion: 'Série 6',
    Prix: 1500000,
    Reserve: true,
    PrixPaye: 12000,
    Accepte: false,
    Refuse: false,
    annule: true
  },
  {
    Date: '12/12/2018',
    Client: {
      NomClient: 'Chabane Zahra',
      WilayaClient: 'Alger',
      NumClient: '0543 76 87 98',
    },
    NomModele: 'Golf',
    NomVersion: 'Série 6',
    Prix: 1500000,
    Reserve: true,
    PrixPaye: 12000,
    Accepte: false,
    Refuse: false,
    annule: true
  },
  {
    Date: '12/12/2018',
    Client: {
      NomClient: 'Chabane Zahra',
      WilayaClient: 'Alger',
      NumClient: '0543 76 87 98',
    },
    NomModele: 'Golf',
    NomVersion: 'Série 6',
    Prix: 1500000,
    Reserve: true,
    PrixPaye: 12000,
    Accepte: false,
    Refuse: false,
    annule: true
  },
  {
    Date: '12/12/2018',
    Client: {
      NomClient: 'Chabane Zahra',
      WilayaClient: 'Alger',
      NumClient: '0543 76 87 98',
    },
    NomModele: 'Golf',
    NomVersion: 'Série 6',
    Prix: 1500000,
    Reserve: false,
    PrixPaye: 0,
    Accepte: false,
    Refuse: false,
    annule: true
  },
  {
    Date: '12/12/2018',
    Client: {
      NomClient: 'Chabane Zahra',
      WilayaClient: 'Alger',
      NumClient: '0543 76 87 98',
    },
    NomModele: 'Dacia',
    NomVersion: 'Série 6',
    Prix: 1500000,
    Reserve: false,
    PrixPaye: 0,
    Accepte: false,
    Refuse: false,
    annule: true
  }
];

@Injectable({
  providedIn: 'root'
})

export class CommandeServiceMock {

  constructor() { }

  /**
   * Récupérer toutes les commandes de la marque ordonnées par date
   */
  getAllCommandes(): Observable<Commande[]> {
    return Observable.of(data1);
  }

  /**
   * Récupérer toutes les commandes prépayées de la marque ordonnées par date
   */
  getCommandesPrepayes(): Observable<Commande[]> {
    return Observable.of(data2);
  }

  /**
   * Récupérer toutes les commandes annullées de la marque ordonnées par date
   */
  getCommandesAnnulles(): Observable<Commande[]> {
    return Observable.of(data3);
  }

  /**
   * Récupérer toutes les nouvelles commandes  de la marque ordonnées par date
   */
  getCommandesNouvelles(): Observable<Commande[]> {
    return Observable.of(data3);
  }
}


