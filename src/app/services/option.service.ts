import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {ModeleDetail} from './entites/modeleDetail.model';
import {Option} from './entites/option.model';
@Injectable({
  providedIn: 'root'
})
export class OptionService {

  private url = this.injector.get('url');
  private serviceUrlOptions = this.url + '/marques/modeles/';
  private options: Option[];

  constructor(private http: HttpClient, private injector: Injector) {
  }

  ajouter(code: string, designation: string, codeVersion: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.post(this.url + '/Marques/Modeles/Versions/' + codeVersion + '/Options',
      {CodeOption: code, NomOption: designation}, {headers: tokenHeader});
  }

  supprimer(code: string, codeVersion: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.delete(this.url + '/Marques/Modeles/Versions/' + codeVersion + '/Options/' + code,
     {headers: tokenHeader}).pipe();

  }

  ajouterOptionModele(code: string, designation: string, codeModele: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.post(this.url + '/Marques/Modeles/' + codeModele + '/Options',
      {CodeOption: code, NomOption: designation}, {headers: tokenHeader}).subscribe(() => {

    });
  }

  getOptions(codeModele): Observable<Option[]> {
    let options;
    this.http.get<ModeleDetail>(this.serviceUrlOptions + codeModele).subscribe(modele => {
      options = (modele as ModeleDetail).options as Option[];
    });
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(options);
        observer.complete();
      }, 2000);
    });
  }

  supprimerDuModele(code: string, codeModele: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    alert(this.url + '/Marques/Modeles/' + codeModele + '/Options/' + code);
    return this.http.delete(this.url + '/Marques/Modeles/' + codeModele + '/Options/' + code,
      {headers: tokenHeader}).pipe();
  }

  modifier(code: string, nom: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.put(this.url + '/Marques/Modeles/Versions/Options/' + code,
      {CodeOption: code, NomOption: nom}, {headers: tokenHeader});
  }
}
