import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {ModeleDetail} from './entites/modeleDetail.model';
import {Couleur} from './entites/couleur.model';
import {ModeleService} from './modele.service';


@Injectable({
  providedIn: 'root'
})
export class CouleurService {
  private url = this.injector.get('url');
  private serviceUrl= this.url + '/marques/modeles/';

  constructor(private http: HttpClient, private injector: Injector, private modeleService: ModeleService) {
  }


  /**
   * supprimer une couleur d'un modèle
   * @param code
   * @param codeModele
   */
  supprimerCouleurModele(code: string, codeModele: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.delete(this.url + '/Marques/Modeles/' + codeModele + '/Couleurs/' + code,
     {headers: tokenHeader}).pipe();

  }

  /**
   * ajouter une couleur et l'associer à un modèle donnée
   * @param code
   * @param designation
   * @param hexa
   * @param codeModele
   */
  ajouterCouleurModele(code: string, designation: string, hexa: string, codeModele: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.post(this.url + '/Marques/Modeles/' + codeModele + '/Couleurs',
      {CodeCouleur: code, NomCouleur: designation, CodeHexa: hexa}, {headers: tokenHeader}).pipe();
  }


  /**
   * Associer une couleur à une version
   * @param code
   * @param codeVersion
   */
  ajouterCouleurVersion(code: string, codeVersion: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.post(this.url + '/Marques/Modeles/Versions/' + codeVersion + '/Couleurs',
      {CodeCouleur: code}, {headers: tokenHeader}).pipe();
  }


  /**
   * Récupérer les couleurs associées à un modèle
   * @param codeModele
   */
  getCouleurs(codeModele): Observable<Couleur[]> {
    return this.http.get<Couleur[]>(this.serviceUrl + codeModele + '/couleurs');
  }


  /**
   * Récupérer la liste des couleurs compatibles avec une version
   * @param codeVersion
   */
  getCouleursVersion(codeVersion): Observable<Couleur[]> {
    return this.http.get<Couleur[]>(this.serviceUrl + 'versions/' + codeVersion + '/couleurs');

  }

  /**
   * Modifier une couleur
   * @param code
   * @param nom
   * @param codeHexa
   */
  modifierCouleur(code: string, nom: string, codeHexa: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.put(this.url + '/Marques/Modeles/Versions/Couleurs/' + code,
      {CodeCouleur: code, NomCouleur: nom, CodeHexa: codeHexa}, {headers: tokenHeader}).pipe();
  }


  /**
   * Supprimer une couleur d'une version
   * @param code
   * @param codeVersion
   */
  supprimerVersion(code: string, codeVersion: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.delete(this.url + '/Marques/Modeles/Versions/' + codeVersion + '/Couleurs/' + code,
      {headers: tokenHeader}).pipe();

  }
}
