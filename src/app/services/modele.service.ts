import {Injectable, Injector} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Modele } from './modele.model';
import { ModeleDetail } from './modeleDetail.model';
import {map} from 'rxjs/operators';

@Injectable()
export class ModeleService {

  private url = this.injector.get('url');
  private serviceUrlModeles = this.url + '/marques/5/modeles';
  private serviceUrlModele =  this.url + '/marques/modeles/';

  constructor(private http: HttpClient, private injector: Injector) { }

  getModeles(): Observable<Modele[]> {
    return this.http.get<Modele[]>(this.serviceUrlModeles);
  }

  getModele(codeModele): Observable<ModeleDetail> {
    return this.http.get<ModeleDetail>(this.serviceUrlModele + codeModele);
  }

}
