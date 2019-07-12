import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Commande} from '../services/entites/commande.model';


const data1: Commande[] = [
  {
    idCommande: '12',
    Date: '12/12/2018',
    automobiliste: {
      idAutomobiliste: '12',
      Nom: 'Chabane',
      NumTel: '0543 76 87 98',
      Prenom: 'zahra'
    },
    vehicule: {
      NomModele: 'Golf',
      NomVersion: 'Série 6',
      NumChassis: '09654AZRTYHH',
      NomMarque: 'Wolswagen'
    },

    Montant: 1500000,
    Reservation: null,
    Etat: 0
  },
  {
    idCommande: '12',
    Date: '12/12/2018',
    automobiliste: {
      idAutomobiliste: '12',
      Nom: 'Chabane',
      NumTel: '0543 76 87 98',
      Prenom: 'zahra'
    },
    vehicule: {
      NomModele: 'Golf',
      NomVersion: 'Série 6',
      NumChassis: '09654AZRTYHH',
      NomMarque: 'Wolswagen'
    },

    Montant: 1500000,
    Reservation:  12000,
    Etat: 2
  },
  {idCommande: '12',
    Date: '12/12/2018',
    automobiliste: {
      idAutomobiliste: '12',
      Nom: 'Chabane',
      NumTel: '0543 76 87 98',
      Prenom: 'zahra'
    },
    vehicule: {
      NomModele: 'Golf',
      NomVersion: 'Série 6',
      NumChassis: '09654AZRTYHH',
      NomMarque: 'Wolswagen'
    },
    Montant: 1500000,
    Reservation: null,
    Etat: 1
  }

];

const data2: Commande[] = [
  {
    idCommande: '12',
    Date: '12/12/2018',
    automobiliste: {
      idAutomobiliste: '12',
      Nom: 'Chabane',
      NumTel: '0543 76 87 98',
      Prenom: 'zahra'
    },
    vehicule: {
      NomModele: 'Golf',
      NomVersion: 'Série 6',
      NumChassis: '09654AZRTYHH',
      NomMarque: 'Wolswagen'
    },
    Montant: 1500000,
    Reservation: 12000,
    Etat: 0
  },
  {
    idCommande: '12',
    Date: '12/12/2018',
    automobiliste: {
      idAutomobiliste: '12',
      Nom: 'Chabane',
      NumTel: '0543 76 87 98',
      Prenom: 'zahra'
    },
    vehicule: {
      NomModele: 'Golf',
      NomVersion: 'Série 6',
      NumChassis: '09654AZRTYHH',
      NomMarque: 'Wolswagen'
    },
    Montant: 1500000,
    Reservation: 14000,
    Etat: 3
  },
  {
    idCommande: '12',
    Date: '12/12/2018',
    automobiliste: {
      idAutomobiliste: '12',
      Nom: 'Chabane',
      NumTel: '0543 76 87 98',
      Prenom: 'zahra'
    },
    vehicule: {
      NomModele: 'Golf',
      NomVersion: 'Série 6',
      NumChassis: '09654AZRTYHH',
      NomMarque: 'Wolswagen'
    },
    Montant: 1500000,
    Reservation: 13000,
    Etat: 3
  },
  {
    idCommande: '12',
    Date: '12/12/2018',
    automobiliste: {
      idAutomobiliste: '12',
      Nom: 'Chabane',
      NumTel: '0543 76 87 98',
      Prenom: 'zahra'
    },
    vehicule: {
      NomModele: 'Golf',
      NomVersion: 'Série 6',
      NumChassis: '09654AZRTYHH',
      NomMarque: 'Wolswagen'
    },
    Montant: 1500000,
    Reservation: null,
    Etat: 0
  }
];

const data3: Commande[] = [
  {
    idCommande: '12',
    Date: '12/12/2018',
    automobiliste: {
      idAutomobiliste: '12',
      Nom: 'Chabane',
      NumTel: '0543 76 87 98',
      Prenom: 'zahra'
    },
    vehicule: {
      NomModele: 'Golf',
      NomVersion: 'Série 6',
      NumChassis: '09654AZRTYHH',
      NomMarque: 'Wolswagen'
    },
    Montant: 1500000,
    Reservation: null,
    Etat: 1
  },
  {
    idCommande: '12',
    Date: '12/12/2018',
    automobiliste: {
      idAutomobiliste: '12',
      Nom: 'Chabane',
      NumTel: '0543 76 87 98',
      Prenom: 'zahra'
    },
    vehicule: {
      NomModele: 'Golf',
      NomVersion: 'Série 6',
      NumChassis: '09654AZRTYHH',
      NomMarque: 'Wolswagen'
    },
    Montant: 1500000,
    Reservation: null,
    Etat: 1
  },
  {
    idCommande: '12',
    Date: '12/12/2018',
    automobiliste: {
      idAutomobiliste: '12',
      Nom: 'Chabane',
      NumTel: '0543 76 87 98',
      Prenom: 'zahra'
    },
    vehicule: {
      NomModele: 'Golf',
      NomVersion: 'Série 6',
      NumChassis: '09654AZRTYHH',
      NomMarque: 'Wolswagen'
    },
    Montant: 1500000,
    Reservation: null,
    Etat: 1
  },
];

const data4: Commande[] = [
  {
    idCommande: '12',
    Date: '12/12/2018',
    automobiliste: {
      idAutomobiliste: '12',
      Nom: 'Chabane',
      NumTel: '0543 76 87 98',
      Prenom: 'zahra'
    },
    vehicule: {
      NomModele: 'Golf',
      NomVersion: 'Série 6',
      NumChassis: '09654AZRTYHH',
      NomMarque: 'Wolswagen'
    },
    Montant: 1500000,
    Reservation: null,
    Etat: 0
  },
  {
    idCommande: '12',
    Date: '12/12/2018',
    automobiliste: {
      idAutomobiliste: '12',
      Nom: 'Chabane',
      NumTel: '0543 76 87 98',
      Prenom: 'zahra'
    },
    vehicule: {
      NomModele: 'Golf',
      NomVersion: 'Série 6',
      NumChassis: '09654AZRTYHH',
      NomMarque: 'Wolswagen'
    },
    Montant: 1500000,
    Reservation: null,
    Etat: 0
  },
  {
    idCommande: '12',
    Date: '12/12/2018',
    automobiliste: {
      idAutomobiliste: '12',
      Nom: 'Chabane',
      NumTel: '0543 76 87 98',
      Prenom: 'zahra'
    },
    vehicule: {
      NomModele: 'Golf',
      NomVersion: 'Série 6',
      NumChassis: '09654AZRTYHH',
      NomMarque: 'Wolswagen'
    },
    Montant: 1500000,
    Reservation: null,
    Etat: 0
  },
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
    return Observable.of(data4);
  }
}


