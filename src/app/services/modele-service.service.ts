import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModeleServiceService {

  adresse = 'http://localhost:3000/';

  constructor(private http: HttpClient) {
  }

  ajouter(code: string, designation: string) {
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);


    return this.http.post(this.adresse + 'Marques/' + JSON.parse(localStorage.getItem('utilisateur')).utilfab.Fabricant + '/Modeles',
      {CodeModele: code, NomModele: designation}, {headers: tokenHeader}).subscribe((data) => {
    });
  }

}

