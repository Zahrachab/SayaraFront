import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private url = this.injector.get('url');
  private imagesVersionUrl = this.url + '/images/version/';
  constructor(private http: HttpClient, private injector: Injector) {}


  public uploadImage(image: File, codeVersion: string) {
    const formData = new FormData();

    formData.append('image', image);

    return this.http.post(this.imagesVersionUrl + codeVersion, formData);
  }
}
