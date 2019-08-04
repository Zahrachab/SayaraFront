import {Injectable, Injector} from '@angular/core';
import { ModeleDetail } from './entites/modeleDetail.model';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';


@Injectable()
export class ModeleService {

  private url = this.injector.get('url');
  public serviceUrlModeles = this.url + '/marques/' + JSON.parse(localStorage.getItem('utilisateur')).utilfab.Fabricant + '/modeles';
  public serviceUrlModele =  this.url + '/marques/modeles/';

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
        e = 'Ce modele existe déja';
      } else if (error.status === 404) {
        e = 'Votre marque n\'existe plus';
      } else {
        e = 'Une erreur s\'est produite, réessayer ulterieurement';
      }
    }
    return throwError(e);
  }

  constructor(private http: HttpClient, private injector: Injector) {
  }


  /**
   * Récupérer tous les modèles d'une marque
   */
  getModeles(): Observable<ModeleDetail[]> {
    return this.http.get<ModeleDetail[]>(this.serviceUrlModeles);
  }


  /**
   *Récupérer un modèle avec son code
   * @param codeModele
   */
  getModele(codeModele): Observable<ModeleDetail> {
    return this.http.get<ModeleDetail>(this.serviceUrlModele + codeModele);
  }


  /**
   * Ajouter un modèle à une marque
   * @param code
   * @param designation
   */
  ajouter(code: string, designation: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.post(this.url + '/Marques/' + JSON.parse(localStorage.getItem('utilisateur')).utilfab.Fabricant + '/Modeles',
      {CodeModele: code, NomModele: designation}, {headers: tokenHeader}).pipe(
        catchError(ModeleService.handleError)
    );
  }

  /**
   * Supprimer un modèle d'une marque
   * @param codeModele
   */
  supprimerModele(codeModele) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.delete(this.serviceUrlModele + codeModele, {headers: tokenHeader}).pipe(
    );
  }


  /**
   * Modifier le nom d'un modèle
   * @param code
   * @param nom
   */
  modifier(code: string, nom: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.put(this.url + '/Marques/Modeles/' + code,
      {CodeModele: code, NomModele: nom}, {headers: tokenHeader});
  }
}
