import {Injectable, Injector} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Commande} from './entites/commande.model';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable()
export class CommandeService {

  private url = this.injector.get('url') + '/vehicules/commandes';
  private  fabriquant = JSON.parse(localStorage.getItem('utilisateur')).utilfab.Fabricant ;
  private urlCommandes =  this.url + '?fabricant='+ this.fabriquant;
  private urlNouvellesCommandes =  this.url + '/nonvalidees?fabricant='+ this.fabriquant;
  private  urlCommandesAnnulles =  this.url + '/annulees?fabricant='+ this.fabriquant;
  private  urlCommandesValides =  this.url + '/validees?fabricant='+ this.fabriquant;
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
   return this.http.get<Commande[]>(this.urlCommandes).pipe(
     catchError(CommandeService.handleError)
   );
  }

  /**
   * Récupérer toutes les commandes prépayées de la marque ordonnées par date
   */
  getCommandesPrepayes(): Observable<Commande[]> {
    // a corriger
    return this.http.get<Commande[]>(this.urlCommandes).pipe(
      catchError(CommandeService.handleError)
    );
  }

  /**
   * Récupérer toutes les commandes annullées de la marque ordonnées par date
   */
  getCommandesAnnulles(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.urlCommandesAnnulles).pipe(
      catchError(CommandeService.handleError)
    );
  }

  /**
   * Récupérer toutes les nouvelles commandes non traitées de la marque ordonnées par date
   */
  getCommandesNouvelles(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.urlNouvellesCommandes).pipe(
      catchError(CommandeService.handleError)
    );
  }

  /**
   * Valider une commmande
   * @param commande
   */
  validerCommande(commande: Commande) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.put(this.url + '/' + commande.idCommande + '/valider',
       {headers: tokenHeader}).pipe(
         catchError(CommandeService.handleError)
    );
  }

  /**
   * Rejeter une commande
   * @param commande
   */
  rejeterCommande(commande: Commande) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.put(this.url + '/' + commande.idCommande + '/rejeter',
      {headers: tokenHeader}).pipe(
        catchError(CommandeService.handleError)
    );
  }


}

