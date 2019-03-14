import {Injectable, Injector} from '@angular/core';
import { ModeleDetail } from './entites/modeleDetail.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable } from 'rxjs';


@Injectable()
export class ModeleService {

  private url = this.injector.get('url');
  private serviceUrlModeles = this.url + '/marques/' + JSON.parse(localStorage.getItem('utilisateur')).utilfab.Fabricant + '/modeles';
  private serviceUrlModele =  this.url + '/marques/modeles/';

  constructor(private http: HttpClient, private injector: Injector) {
  }

  /*Récupérer tous les modèles d'une marque */
  getModeles(): Observable<ModeleDetail[]> {
    return this.http.get<ModeleDetail[]>(this.serviceUrlModeles);
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

  supprimerModele(codeModele) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.delete(this.serviceUrlModele + codeModele, {headers: tokenHeader}).pipe(
    );
  }
}
