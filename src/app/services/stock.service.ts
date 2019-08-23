import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Vehicule} from './entites/Vehicule.model';
import {StockVehicule} from './entites/stockVehicule.model';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  get urlStockVehicules(): string {
    return this._urlStockVehicules;
  }

  get urlStockInfos(): string {
    return this._urlStockInfos;
  }

  get urlPostStock(): string {
    return this._urlPostStock;
  }

  private url = 'https://sayaradz.herokuapp.com';
  private _urlStockVehicules = this.url + '/vehicules/stock/';
  private _urlStockInfos = this.url + '/stock/infos';
  private fabriquant = JSON.parse(localStorage.getItem('utilisateur')).utilfab.Fabricant;
  private _urlPostStock = this.url + '/vehicules/stock?fabricant='+this.fabriquant;
  private _urlPostTarif = this.url + '/vehicules/stock/lignetarif?fabricant='+this.fabriquant;



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
        e = 'Existe déja';
      } else if (error.status === 404) {
        e = 'Version Inéxistante';
      } else {
        e = 'Une erreur s\'est produite, réessayer ulterieurement';
      }
    }
    return throwError(e);
  }


  private static handleErrorUploadStock(error: HttpErrorResponse) {
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
      } else if (error.status === 500) {
        e = 'Vérifiez que les codes options, couleur, version existent bien dans le système';
      } else if (error.status === 409) {
        e = 'il ya un ou plusieurs véhicules déjà existants dans le système';
      } else {
        e = 'Une erreur s\'est produite, réessayer ulterieurement';
      }
    }
    return throwError(e);
  }

  /**
   * Récupérer tous les véhicules dans le stock pour un modèle donné
   **/
  getStockVersion(codeVersion: string): Observable<StockVehicule[]> {
    return this.http.get<StockVehicule[]>(this._urlStockVehicules+ codeVersion).pipe(
      catchError(StockService.handleError)
    );
  }

  /**
   * Récupérer le nombre de véhicules en stock pour un fabriquant ainsi que la dernière mise à jour du stock
   **/
  getInfoStock(): Observable<any> {
    return this.http.get<any>(this._urlStockInfos).pipe(
      catchError(StockService.handleError)
    );
  }


  /**uploader le fichier csv du stock
   *
   */
  public uploadCsv(csv: File) {
    const formData = new FormData();

    formData.append('stockFile', csv);
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.post(this._urlPostStock , formData, {headers: tokenHeader}).pipe(
      catchError(StockService.handleErrorUploadStock)
    );
  }


  /**uploader le fichier csv Tarif
   *
   */
  public uploadTarifCsv(csv: File) {
    const formData = new FormData();

    formData.append('stockFile', csv);
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.post(this._urlPostTarif , formData, {headers: tokenHeader}).pipe(
      catchError(StockService.handleError)
    );
  }

  /**
   * récupérer la liste des véhicules avec les options et la,couleur configurés existants dans le stock.
   * @param codeVersion
   * @param codeCouleur
   * @param options
   */
  public getVehiculesDispo(codeVersion: String, codeCouleur: String, options: Array<String>): Observable<Vehicule[]>
  {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.post(this.urlStockVehicules + 'disponible',
      {codeVersion: codeVersion , codeCouleur: codeCouleur, Options: options}, {headers: tokenHeader}).pipe(
        catchError(StockService.handleError)
    ) as Observable<Vehicule[]>;
  }
}
