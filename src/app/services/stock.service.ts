import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StockVersion} from './entites/stock.modele';
import {Vehicule} from './entites/Vehicule.model';
import {StockVehicule} from './entites/stockVehicule.model';

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
  private _urlPostStock = this.url + '/vehicules/stock/stock' ;


  constructor(private http: HttpClient, private injector: Injector) {
  }

  /**
   * Récupérer tous les véhicules dans le stock pour un modèle donné
   **/
  getStockVersion(codeVersion: string): Observable<StockVehicule[]> {
    return this.http.get<StockVehicule[]>(this._urlStockVehicules+ codeVersion);
  }

  /**
   * Récupérer le nombre de véhicules en stock pour un fabriquant ainsi que la dernière mise à jour du stock
   **/
  getInfoStock(): Observable<any> {
    return this.http.get<any>(this._urlStockInfos);
  }


  /**uploader le fichier csv du stock
   *
   */
  public uploadCsv(csv: File) {
    const formData = new FormData();

    formData.append('stockFile', csv);
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.post(this._urlPostStock , formData, {headers: tokenHeader});
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
      {codeVersion: codeVersion , codeCouleur: codeCouleur, Options: options}, {headers: tokenHeader}) as Observable<Vehicule[]>;
  }
}
