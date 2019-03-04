import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Modele } from './entites/modele.model';
import { ModeleDetail } from './entites/modeleDetail.model';

@Injectable()
export class ModeleService {

  private url = this.injector.get('url');
  private serviceUrlModeles = this.url + '/marques/' + JSON.parse(localStorage.getItem('utilisateur')).utilfab.Fabricant + '/modeles';
  private serviceUrlModele =  this.url + '/marques/modeles/';

  constructor(private http: HttpClient, private injector: Injector) {
  }

  getModeles(): Observable<Modele[]> {
    return this.http.get<Modele[]>(this.serviceUrlModeles);
  }

  getModele(codeModele): Observable<ModeleDetail> {
    return this.http.get<ModeleDetail>(this.serviceUrlModele + codeModele);
  }

  ajouter(code: string, designation: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);


    return this.http.post(this.url + '/Marques/' + JSON.parse(localStorage.getItem('utilisateur')).utilfab.Fabricant + '/Modeles',
      {CodeModele: code, NomModele: designation}, {headers: tokenHeader}).subscribe(() => {
    });
  }
}
