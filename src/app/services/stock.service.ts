import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Stock} from './entites/stock.modele';
import {Vehicule} from './entites/Vehicule.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private url = this.injector.get('url');
  private urlStockVehicules = this.url + '/stock/modele/';
  private urlStockInfos = this.url + '/stock/infos';
  private urlPostStock = this.url + '/vehicules/stock/stock' ;


  constructor(private http: HttpClient, private injector: Injector) {
  }

  /**
   * Récupérer tous les véhicules dans le stock pour un modèle donné
   **/
  getStock(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.urlStockVehicules);
  }

  /**
   * Récupérer le nombre de véhicules en stock pour un fabriquant ainsi que la dernière mise à jour du stock
   **/
  getInfoStock(): Observable<any> {
    return this.http.get<any>(this.urlStockInfos);
  }


  /**uploader le fichier csv du stock
   *
   */
  public uploadCsv(csv: File) {
    const formData = new FormData();

    formData.append('stockFile', csv);
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.post(this.urlPostStock , formData, {headers: tokenHeader});
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
    return this.http.post(this.url + '/vehicules/stock/disponible',
      {codeVersion: codeVersion , codeCouleur: codeCouleur, Options: options}, {headers: tokenHeader}) as Observable<Vehicule[]>;
  }
}
