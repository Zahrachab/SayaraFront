import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {ModeleDetail} from './entites/modeleDetail.model';
import {Option} from './entites/option.model';
import {OptionDetail} from './entites/optionDetail.model';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OptionService {

  constructor(private http: HttpClient) {
  }

  public url = 'https://sayaradz.herokuapp.com';
  public serviceUrlOptions = this.url + '/marques/modeles/';

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
          e = 'Cette option existe déja';
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
        e = 'Cette option existe déja';
      } else if (error.status === 404) {
        e = 'Cette version n\'existe pas';
      } else {
        e = 'Une erreur s\'est produite, réessayer ulterieurement';
      }
    }
    return throwError(e);
  }

  ajouter(code: string, designation: string, codeVersion: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.post(this.serviceUrlOptions + 'versions/' + codeVersion + '/options',
      {CodeOption: code, NomOption: designation}, {headers: tokenHeader}).pipe(
        catchError(OptionService.handleErrorForVersionInsertion)
    );
  }

  // supprimer option d'une version
  supprimer(code: string, codeVersion: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.delete(this.serviceUrlOptions + 'versions/' + codeVersion + '/options/' + code,
     {headers: tokenHeader}).pipe(
       catchError(OptionService.handleErrorForVersionInsertion)
    );

  }

  ajouterOptionModele(code: string, designation: string, codeModele: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.post(this.serviceUrlOptions + codeModele + '/options',
      {CodeOption: code, NomOption: designation}, {headers: tokenHeader}).pipe(
        catchError(OptionService.handleError)
    );
  }

  getOptions(codeModele): Observable<Option[]> {
    return  this.http.get<Option[]>(this.serviceUrlOptions + codeModele + '/options').pipe(
      catchError(OptionService.handleError)
    );
  }

  getOptionsWithLigneTarifs(codeModele): Observable<OptionDetail[]> {
    return this.http.get<OptionDetail[]>(this.serviceUrlOptions + codeModele + '/options').pipe(
      catchError(OptionService.handleError)
    );
  }

  getOptionsVersion(codeVersion): Observable<OptionDetail[]> {
    return this.http.get<OptionDetail[]>(this.serviceUrlOptions + 'versions/' + codeVersion + '/options').pipe(
      catchError(OptionService.handleErrorForVersionInsertion)
    );

  }

  supprimerDuModele(code: string, codeModele: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.delete(this.serviceUrlOptions + codeModele + '/options/' + code,
      {headers: tokenHeader}).pipe(
        catchError(OptionService.handleError)
    );
  }

  modifier(code: string, nom: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.put(this.serviceUrlOptions + 'versions/options/' + code,
      {CodeOption: code, NomOption: nom}, {headers: tokenHeader}).pipe(
        catchError(OptionService.handleError)
    );
  }
}
