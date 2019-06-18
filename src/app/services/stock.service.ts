import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Stock} from './entites/stock.modele';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private url = this.injector.get('url');
  private urlStockVehicules = this.url + '/stock/modele/';
  private urlStockInfos = this.url + '/stock/infos';

  constructor(private http: HttpClient, private injector: Injector) {
  }

  /*Récupérer tous les véhicules dans le stock pour un modèle donné*/
  getStock(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.urlStockVehicules);
  }

  /*Récupérer le nombre de véhicules en stock pour un fabriquant ainsi que la dernière mise à jour du stock  */
  getInfoStock(): Observable<any> {
    return this.http.get<any>(this.urlStockInfos);
  }
}