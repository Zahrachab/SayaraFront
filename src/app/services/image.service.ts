import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  get url(): string {
    return this._url;
  }

  get imagesVersionUrl(): string {
    return this._imagesVersionUrl;
  }
  private _url  = "https://sayaradz.herokuapp.com";
  private _imagesVersionUrl = this._url + '/images/versions/';
  constructor(private http: HttpClient, private injector: Injector) {}


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
        e = 'Impossible d\'inserer cette image';
      } else if (error.status === 404) {
        e = 'Cette version n\'existe pas';
      } else {
        e = 'Une erreur s\'est produite, réessayer ulterieurement';
      }
    }
    return throwError(e);
  }

  /**
   * Ajouter une photo à une couleur d'une version
   * @param image
   * @param codeVersion
   * @param codeCouleur
   */
  public uploadImage(image: File, codeVersion: string, codeCouleur: string) {
    const formData = new FormData();
    formData.append('imageVersion', image);
    formData.append('CodeCouleur', codeCouleur);
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.post(this._imagesVersionUrl + codeVersion, formData, {headers: tokenHeader}).pipe(
      catchError(ImageService.handleError)
    );
  }


  /**
   * Supprimer une photo d'une couleur d'une version
   * @param id
   * @param codeVersion
   */
  public supprimerImage(id: string, codeVersion: string, codeCouleur: string) {
      const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
      return this.http.delete(this._url + '/images/' + id,
        {headers: tokenHeader}).pipe(
          catchError(ImageService.handleError)
      );

    }
}
