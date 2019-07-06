import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Couleur} from './entites/couleur.model';
import {Commande} from './entites/commande.model';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor() { }

  /**
   * Récupérer toutes les commandes de la marque ordonnées par date
   */
  getAllCommandes(): Observable<Commande[]> {
    return null;
  }

  /**
   * Récupérer toutes les commandes prépayées de la marque ordonnées par date
   */
  getCommandesPrepayes(): Observable<Commande[]> {
    return null;
  }

  /**
   * Récupérer toutes les commandes annullées de la marque ordonnées par date
   */
  getCommandesAnnulles(): Observable<Commande[]> {
    return null;
  }

  /**
   * Récupérer toutes les nouvelles commandes non traitées de la marque ordonnées par date
   */
  getCommandesNouvelles(): Observable<Commande[]> {
    return null;
  }
}
