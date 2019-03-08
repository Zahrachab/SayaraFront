import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {VersionDetail} from './entites/versionDetail.model';
import {Observable} from 'rxjs';
import {ModeleDetail} from './entites/modeleDetail.model';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  private url = this.injector.get('url');
  private urlVersionDetails = this.url + '/marques/modeles/';

  constructor(private http: HttpClient, private injector: Injector) { }

  ajouter(code: string, designation: string, model: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    this.http.post(this.url + '/Marques/Modeles/' + model + '/Versions',
      {CodeVersion: code, NomVersion: designation}, {headers: tokenHeader}).subscribe(() => {
    });
  }

  getVersions(codeModele): Observable<VersionDetail[]> {
    console.log(this.urlVersionDetails + codeModele + '/versions');
    return this.http.get<VersionDetail[]>(this.urlVersionDetails + codeModele + '/versions');
  }
}
