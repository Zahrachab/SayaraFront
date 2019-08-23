import {Injectable, Injector} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Commande} from './entites/commande.model';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

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

  private static handleError(error: HttpErrorResponse) {
    let e: string;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      e = 'Une erreur s\'est produite, réessayer ulterieurement';
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}`);
      if (error.status === 401) {
        e = 'Vous n\'ètes pas autorisé a effectué cette action';
      } else if (error.status === 409) {
        e = 'Commande déja existante';
      } else if (error.status === 404) {
        e = 'Probleme de connexion';
      } else {
        e = 'Une erreur s\'est produite, réessayer ulterieurement';
      }
    }
    return throwError(e);
  }

  /**
   * Récupérer toutes les commandes de la marque ordonnées par date
   */
  getAllCommandes(): Observable<Commande[]> {
   return this.http.get<Commande[]>(this._urlCommandes).pipe(
     catchError(CommandeService.handleError)
   );
  }

  /**
   * Récupérer toutes les commandes prépayées de la marque ordonnées par date
   */
  getCommandesValides(): Observable<Commande[]> {
    // a corriger
    return this.http.get<Commande[]>(this._urlCommandesValides).pipe(
      catchError(CommandeService.handleError)
    );
  }

  /**
   * Récupérer toutes les commandes annullées de la marque ordonnées par date
   */
  getCommandesAnnulles(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this._urlCommandesAnnulles).pipe(
      catchError(CommandeService.handleError)
    );
  }

  /**
   * Récupérer toutes les nouvelles commandes non traitées de la marque ordonnées par date
   */
  getCommandesNouvelles(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this._urlNouvellesCommandes).pipe(
      catchError(CommandeService.handleError)
    );
  }

  /**
   * Valider une commmande
   * @param commande
   */
  validerCommande(idCommande : string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.put(this._url + '/' + idCommande + '/valider',
       {headers: tokenHeader}).pipe(
         catchError(CommandeService.handleError)
    );
  }

  /**
   * Rejeter une commande
   * @param commande
   */
  rejeterCommande(idCommande: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.put(this._url + '/' + idCommande + '/rejeter',
      {headers: tokenHeader}).pipe(
        catchError(CommandeService.handleError)
    );
  }




}

