import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  adresse = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  ajouter(code: string, designation: string, model: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    this.http.post(this.adresse + 'Marques/Modeles/' + model + '/Versions',
      {CodeVersion: code, NomVersion: designation}, {headers: tokenHeader}).subscribe(() => {
    });
  }
}
