import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {ModeleDetail} from './entites/modeleDetail.model';
import {Couleur} from './entites/couleur.model';
import {observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouleurService {
  private url = this.injector.get('url');
  private serviceUrlOptions = this.url + '/marques/modeles/';

  constructor(private http: HttpClient, private injector: Injector) {
  }

  /* supprimer une couleur d'un modèle */
  supprimerCouleurModele(code: string, codeModele: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.delete(this.url + '/Marques/Modeles/' + codeModele + '/Couleurs/' + code,
     {headers: tokenHeader}).pipe();

  }

  /* ajouter une couleur et l'associer à un modèle donnée */
  ajouterCouleurModele(code: string, designation: string, codeModele: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.post(this.url + '/Marques/Modeles/' + codeModele + '/Couleurs',
      {CodeCouleur: code, NomCouleur: designation}, {headers: tokenHeader}).subscribe(() => {

    });
  }

  /* récupérer les couleurs associées à un modèle */
  getCouleurs(codeModele): Observable<Couleur[]> {
    let couleurs;
    this.http.get<ModeleDetail>(this.serviceUrlOptions + codeModele).subscribe(modele => {
      couleurs = (modele as ModeleDetail).couleurs as Couleur[];
    });
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(couleurs);
        observer.complete();
      }, 2000);
    });
  }
  /* Modifier un couleur */
  modifierCouleur(code: string, nom: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.put(this.url + '/Marques/Modeles/Versions/Couleurs/' + code,
      {CodeCouleur: code, NomCouleur: nom}, {headers: tokenHeader}).subscribe( res => {});
  }
}
