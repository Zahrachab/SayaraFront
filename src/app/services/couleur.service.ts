import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {ModeleDetail} from './entites/modeleDetail.model';
import {Couleur} from './entites/couleur.model';
import {observable} from 'rxjs';
import {ModeleService} from './modele.service';


@Injectable({
  providedIn: 'root'
})
export class CouleurService {
  private url = this.injector.get('url');
  private serviceUrl= this.url + '/marques/modeles/';

  constructor(private http: HttpClient, private injector: Injector, private modeleService: ModeleService) {
  }

  /* supprimer une couleur d'un modèle */
  supprimerCouleurModele(code: string, codeModele: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.delete(this.url + '/Marques/Modeles/' + codeModele + '/Couleurs/' + code,
     {headers: tokenHeader}).pipe();

  }

  /* ajouter une couleur et l'associer à un modèle donnée */
  ajouterCouleurModele(code: string, designation: string, hexa: string, codeModele: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.post(this.url + '/Marques/Modeles/' + codeModele + '/Couleurs',
      {CodeCouleur: code, NomCouleur: designation, CodeHexa: hexa}, {headers: tokenHeader}).pipe();
  }

  /* récupérer les couleurs associées à un modèle */
  getCouleurs(codeModele): Observable<Couleur[]> {
    return this.http.get<Couleur[]>(this.serviceUrl + codeModele + '/couleurs');
  }

  /* Modifier un couleur */
  modifierCouleur(code: string, nom: string, codeHexa: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.put(this.url + '/Marques/Modeles/Versions/Couleurs/' + code,
      {CodeCouleur: code, NomCouleur: nom, CodeHexa: codeHexa}, {headers: tokenHeader}).pipe();
  }

  /* récupérer la liste des couleurs associés à tous les modèles d'une marque */
  getCouleursMarque(): any{
    const couleursMap = new Map();
    let modeles;
    this.modeleService.getModeles().subscribe( res => {
      modeles = res as ModeleDetail[];
      for (let i = 0; i < modeles.length; i++) {
        const couleurs = modeles[i].couleurs as Couleur[];
        for (let j = 0; j < couleurs.length ; j++) {
          couleursMap.set(couleurs[j].CodeCouleur , couleurs[j]);
        }
      }
      console.log(couleursMap);
      return couleursMap;
    });
  }
}
