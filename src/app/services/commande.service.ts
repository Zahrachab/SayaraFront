import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {Commande} from './entites/commande.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CommandeService {

  private url = this.injector.get('url') + '/vehicules/commandes';
  private  fabriquant = JSON.parse(localStorage.getItem('utilisateur')).utilfab.Fabricant ;
  private urlCommandes =  this.url + '?fabriquant='+ this.fabriquant;
  private urlNouvellesCommandes =  this.url + '/nonvalidees?fabriquant='+ this.fabriquant;
  private  urlCommandesAnnulles =  this.url + '/annulees?fabriquant='+ this.fabriquant;
  private  urlCommandesValides =  this.url + '/validees?fabriquant='+ this.fabriquant;
  constructor(private http: HttpClient, private injector: Injector) { }

  /**
   * Récupérer toutes les commandes de la marque ordonnées par date
   */
  getAllCommandes(): Observable<Commande[]> {
   return this.http.get<Commande[]>(this.urlCommandes);
  }

  /**
   * Récupérer toutes les commandes prépayées de la marque ordonnées par date
   */
  getCommandesPrepayes(): Observable<Commande[]> {
    // a corriger
    return this.http.get<Commande[]>(this.urlCommandes);
  }

  /**
   * Récupérer toutes les commandes annullées de la marque ordonnées par date
   */
  getCommandesAnnulles(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.urlCommandesAnnulles);
  }

  /**
   * Récupérer toutes les nouvelles commandes non traitées de la marque ordonnées par date
   */
  getCommandesNouvelles(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.urlNouvellesCommandes);
  }

}
