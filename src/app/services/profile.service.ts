import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {ModeleDetail} from './entites/modeleDetail.model';
import {catchError} from 'rxjs/operators';
import {Profile} from './entites/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private url = 'https://sayaradz.herokuapp.com';
  private getProfileUrl = this.url + '/utilfab/' + JSON.parse(localStorage.getItem('utilisateur')).utilfab.IdUserF ;
  private putProfileUrl = this.url + '/utilfab/' + JSON.parse(localStorage.getItem('utilisateur')).utilfab.IdUserF ;


  constructor(private http: HttpClient, public injector: Injector) { }


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
        e = 'Ce profile existe déja';
      } else if (error.status === 404) {
        e = 'Votre profile n\'existe plus';
      } else {
        e = 'Une erreur s\'est produite, réessayer ulterieurement';
      }
    }
    return throwError(e);
  }

  /**
   * Récupérer tous les modèles d'une marque
   */
  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.getProfileUrl).pipe(
      catchError(ProfileService.handleError)
    );
  }

  editProfile(mail: string, tel: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.put(this.putProfileUrl,
      {Mail: mail, NumTel: tel}, {headers: tokenHeader}).pipe(
      catchError(ProfileService.handleError)
    );

  }

}
