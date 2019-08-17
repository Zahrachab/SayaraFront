import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  get url(): string {
    return this._url;
  }

  get imagesVersionUrl(): string {
    return this._imagesVersionUrl;
  }
  private _url  = "https://sayaradz.herokuapp.com";
  private _imagesVersionUrl = this._url + '/images/versions/';
  constructor(private http: HttpClient, private injector: Injector) {}


  /**
   * Ajouter une photo à une couleur d'une version
   * @param image
   * @param codeVersion
   * @param codeCouleur
   */
  public uploadImage(image: File, codeVersion: string, codeCouleur: string) {
    const formData = new FormData();
    formData.append('imageVersion', image);
    formData.append('CodeCouleur', codeCouleur);
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.post(this._imagesVersionUrl + codeVersion, formData, {headers: tokenHeader});
  }


  /**
   * Supprimer une photo d'une couleur d'une version
   * @param id
   * @param codeVersion
   */
  public supprimerImage(id: string, codeVersion: string, codeCouleur: string) {
      const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
      return this.http.delete(this._url + '/images/' + id,
        {headers: tokenHeader}).pipe();

    }
}
