import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private url = this.injector.get('url');
  private imagesVersionUrl = this.url + '/images/versions/';
  constructor(private http: HttpClient, private injector: Injector) {}


  public uploadImage(image: File, codeVersion: string) {
    const formData = new FormData();

    formData.append('imageVersion', image);
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    return this.http.post(this.imagesVersionUrl + codeVersion, formData, {headers: tokenHeader});
  }
  public supprimerImage(id: string, codeVersion: string) {
      const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
      return this.http.delete(this.url + '/Marques/Modeles/Versions/' + codeVersion + '/Images/' + id,
        {headers: tokenHeader}).pipe();

    }
}
