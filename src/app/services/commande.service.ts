import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {Commande} from './entites/commande.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class CommandeService {
  get url(): string {
    return this._url;
  }
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

  private _url = 'https://sayaradz.herokuapp.com/vehicules/commandes';
  private  fabriquant = JSON.parse(localStorage.getItem('utilisateur')).utilfab.Fabricant ;
  private _urlCommandes =  this._url + '?fabricant='+ this.fabriquant;
  private _urlNouvellesCommandes =  this._url + '/nonvalidees?fabricant='+ this.fabriquant;
  private _urlCommandesAnnulles =  this._url + '/annulees?fabricant='+ this.fabriquant;
  private _urlCommandesValides =  this._url + '/validees?fabricant='+ this.fabriquant;
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
  getCommandesValides(): Observable<Commande[]> {
    // a corriger
    return this.http.get<Commande[]>(this._urlCommandesValides);
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
  validerCommande(idCommande : string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.put(this._url + '/' + idCommande + '/valider',
       {headers: tokenHeader});
  }

  /**
   * Rejeter une commande
   * @param commande
   */
  rejeterCommande(idCommande: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.put(this._url + '/' + idCommande + '/rejeter',
      {headers: tokenHeader});
  }


}

