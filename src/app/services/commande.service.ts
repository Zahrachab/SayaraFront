import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {Commande} from './entites/commande.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class CommandeService {
  get urlCommandes(): string {
    return this._urlCommandes;
  }

  get urlNouvellesCommandes(): string {
    return this._urlNouvellesCommandes;
  }

  get urlCommandesAnnulles(): string {
    return this._urlCommandesAnnulles;
  }

  get urlCommandesValides(): string {
    return this._urlCommandesValides;
  }

  private url = this.injector.get('url') + '/vehicules/commandes';
  private  fabriquant = JSON.parse(localStorage.getItem('utilisateur')).utilfab.Fabricant ;
  private _urlCommandes =  this.url + '?fabricant='+ this.fabriquant;
  private _urlNouvellesCommandes =  this.url + '/nonvalidees?fabricant='+ this.fabriquant;
  private _urlCommandesAnnulles =  this.url + '/annulees?fabricant='+ this.fabriquant;
  private _urlCommandesValides =  this.url + '/validees?fabricant='+ this.fabriquant;
  constructor(private http: HttpClient, private injector: Injector) { }

  /**
   * Récupérer toutes les commandes de la marque ordonnées par date
   */
  getAllCommandes(): Observable<Commande[]> {
   return this.http.get<Commande[]>(this._urlCommandes);
  }

  /**
   * Récupérer toutes les commandes prépayées de la marque ordonnées par date
   */
  getCommandesPrepayes(): Observable<Commande[]> {
    // a corriger
    return this.http.get<Commande[]>(this._urlCommandes);
  }

  /**
   * Récupérer toutes les commandes annullées de la marque ordonnées par date
   */
  getCommandesAnnulles(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this._urlCommandesAnnulles);
  }

  /**
   * Récupérer toutes les nouvelles commandes non traitées de la marque ordonnées par date
   */
  getCommandesNouvelles(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this._urlNouvellesCommandes);
  }

  /**
   * Valider une commmande
   * @param commande
   */
  validerCommande(commande: Commande) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.put(this.url + '/' + commande.idCommande + '/valider',
       {headers: tokenHeader});
  }

  /**
   * Rejeter une commande
   * @param commande
   */
  rejeterCommande(commande: Commande) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.put(this.url + '/' + commande.idCommande + '/rejeter',
      {headers: tokenHeader});
  }


}

