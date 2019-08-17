import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Couleur} from './entites/couleur.model';
import {ModeleService} from './modele.service';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CouleurService {

  private url = "https://sayaradz.herokuapp.com";
  public serviceUrl = this.url + '/marques/modeles/';

  constructor(private http: HttpClient, private injector: Injector) {
  }

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
        e = 'Cette couleur existe déja';
      } else if (error.status === 404) {
        e = 'Ce modele n\'existe pas';
      } else {
        e = 'Une erreur s\'est produite, réessayer ulterieurement';
      }
    }
    return throwError(e);
  }

  private static handleErrorForVersionInsertion(error: HttpErrorResponse) {
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
        e = 'Cette couleur existe déja';
      } else if (error.status === 404) {
        e = 'Cette version n\'existe pas';
      } else {
        e = 'Une erreur s\'est produite, réessayer ulterieurement';
      }
    }
    return throwError(e);

  }
  /* supprimer une couleur d'un modèle */
  supprimerCouleurModele(code: string, codeModele: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.delete(this.serviceUrl + codeModele + '/couleurs/' + code,
     {headers: tokenHeader}).pipe();

  }

  /* ajouter une couleur et l'associer à un modèle donnée */
  ajouterCouleurModele(code: string, designation: string, hexa: string, codeModele: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.post(this.serviceUrl + codeModele + '/couleurs',
      {CodeCouleur: code, NomCouleur: designation, CodeHexa: hexa}, {headers: tokenHeader}).pipe(
        catchError(CouleurService.handleError)
    );
  }


  /* ajouter une couleur et l'associer à un modèle donnée */
  ajouterCouleurVersion(code: string, codeVersion: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.post(this.serviceUrl + 'versions/' + codeVersion + '/couleurs',
      {CodeCouleur: code}, {headers: tokenHeader}).pipe(
        catchError(CouleurService.handleErrorForVersionInsertion)
    );
  }

  /* récupérer les couleurs associées à un modèle */
  getCouleurs(codeModele): Observable<Couleur[]> {
    return this.http.get<Couleur[]>(this.serviceUrl + codeModele + '/couleurs').pipe(
      catchError(CouleurService.handleError)
    );
  }


  /* récupérer les couleurs associées à un modèle */
  getCouleursVersion(codeVersion): Observable<Couleur[]> {
    return this.http.get<Couleur[]>(this.serviceUrl + 'versions/' + codeVersion + '/couleurs').pipe(
      catchError(CouleurService.handleErrorForVersionInsertion)
    );

  }

  /* Modifier un couleur */
  modifierCouleur(code: string, nom: string, codeHexa: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.put(this.serviceUrl + 'versions/couleurs/' + code,
      {CodeCouleur: code, NomCouleur: nom, CodeHexa: codeHexa}, {headers: tokenHeader}).pipe();
  }

  // supprimer couleur d'une version
  supprimerVersion(code: string, codeVersion: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.delete(this.serviceUrl + 'versions/' + codeVersion + '/couleurs/' + code,
      {headers: tokenHeader}).pipe();

  }
}
