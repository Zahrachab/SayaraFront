import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {ModeleDetail} from './entites/modeleDetail.model';
import {Option} from './entites/option.model';
import {OptionDetail} from './entites/optionDetail.model';
@Injectable({
  providedIn: 'root'
})


export class OptionService {

  public url = 'https://sayaradz.herokuapp.com';
  private serviceUrlOptions = this.url + '/marques/modeles/';

  constructor(private http: HttpClient, private injector: Injector) {
  }

  /**
   * Ajouter une option à une version
   * @param code Code de l'option
   * @param designation Nom de l'option
   * @param codeVersion Code de la version
   */

  ajouter(code: string, designation: string, codeVersion: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.post(this.url + '/Marques/Modeles/Versions/' + codeVersion + '/Options',
      {CodeOption: code, NomOption: designation}, {headers: tokenHeader}).pipe();
  }

  /**
   * Supprimer une option d'une version
   * @param code
   * @param codeVersion
   */
  supprimer(code: string, codeVersion: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.delete(this.url + '/Marques/Modeles/Versions/' + codeVersion + '/Options/' + code,
      {headers: tokenHeader}).pipe();

  }

  /**
   * Ajouter une option à un modèle , si l'option n'existe pas elle sera ajoutée
   * @param code
   * @param designation
   * @param codeModele
   */
  ajouterOptionModele(code: string, designation: string, codeModele: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.post(this.url + '/Marques/Modeles/' + codeModele + '/Options',
      {CodeOption: code, NomOption: designation}, {headers: tokenHeader}).pipe();
  }

  /**
   * Récupérer la liste des options associée à un modèle
   * @param codeModele
   */
  getOptions(codeModele): Observable<Option[]> {
    let options;
    this.http.get<ModeleDetail>(`https://sayaradz.herokuapp.com/marques/modeles/${codeModele}`).subscribe(modele => {
      options = (modele as ModeleDetail).options as Option[];
    });
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(options);
        observer.complete();
      }, 2000);
    });
  }

  /**
   *Récupérer la liste des option d'un modèle avec la ligne tarif
   * @param codeModele
   */
  getOptionsWithLigneTarifs(codeModele): Observable<OptionDetail[]> {
    return this.http.get<OptionDetail[]>(this.serviceUrlOptions + codeModele + '/options');
  }


  /**
   * Récupérer la liste des options compatibles avec une version
   * @param codeVersion
   */
  getOptionsVersion(codeVersion): Observable<OptionDetail[]> {
    return this.http.get<OptionDetail[]>(this.serviceUrlOptions + 'versions/' + codeVersion + '/options');

  }

  /**
   * Supprimer une option d'un modèle
   * @param code
   * @param codeModele
   */
  supprimerDuModele(code: string, codeModele: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.delete(this.url + '/Marques/Modeles/' + codeModele + '/Options/' + code,
      {headers: tokenHeader}).pipe();
  }

  /**
   * Modifier le nom d'une option
   * @param code
   * @param nom
   */
  modifier(code: string, nom: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.put(this.url + '/Marques/Modeles/Versions/Options/' + code,
      {CodeOption: code, NomOption: nom}, {headers: tokenHeader});
  }

}
