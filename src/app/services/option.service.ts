import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  adresse = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  ajouter(code: string, designation: string, codeVersion: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    this.http.post(this.adresse + 'Marques/Modeles/Versions/' + codeVersion + '/Options',
      {CodeOption: code, NomOption: designation}, {headers: tokenHeader}).subscribe(() => {

    });
  }

}
