import {getTestBed, TestBed} from '@angular/core/testing';
import { ModeleService } from '../modele.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ModeleServiceMock} from '../../mocks/Modele.Service.mock';
import {HttpHeaders} from '@angular/common/http';


fdescribe('ModeleService', () => {
  let injector: TestBed;
  let service: ModeleService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ModeleService]
    });
    injector = getTestBed();
    service = injector.get(ModeleService);
    httpMock = injector.get(HttpTestingController);


  });

  beforeAll(() =>{
    //mock du localStorage.getItem
    spyOn(localStorage, 'getItem').and.callFake((key: string): String => {
      return "{\"msg\":\"Authentification résussite !\",\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6NywiTWFpbCI6ImlzbGFtMUBlc2kuZHoiLCJGYWJyaWNhbnQiOjEsIlZhbGlkZSI6MSwiQmxvcXVlIjowLCJpYXQiOjE1NjU5NzU1MzksImV4cCI6MTU2NjA2MTkzOX0.6ZNCXRos6Uf1UBjUh7jtyWGD79t5WCl3sGsfDPzlVEY\",\"utilfab\":{\"IdUserF\":7,\"Mail\":\"islam1@esi.dz\",\"Nom\":\"BOUAYACHE\",\"Prenom\":\"Mohamed Islam\",\"Mdp\":\"$2a$10$vkxiJmerHv3QlRQeGRwoTesUVKuC7iD9YlYFZZ3ve8XayEqRxFaO.\",\"NumTel\":699415163,\"Fabricant\":1,\"Valide\":1,\"Bloque\":0,\"marque\":{\"NomMarque\":\"Volkswagen\"},\"images\":[{\"CheminImage\":\"http://res.cloudinary.com/hftzhatr4/image/upload/v1561070978/Utilisateurs_Fabricants/2019-06-20T22-49-34.672Z_Capture%20d%E2%80%99%C3%A9cran_2019-06-20_23-46-14.png.png\"}]}}";
    });
  });




 it('tester le get de tous les modèles', () => {

   const mock = new ModeleServiceMock();

   var modeles;
   mock.getModeles().subscribe((res) =>{
     modeles = res;
   });

   service.getModeles().subscribe((res)=> {
     expect (res).toEqual(modeles);
   });


   // We set the expectations for the HttpClient mock
   const req = httpMock.expectOne('https://sayaradz.herokuapp.com/marques/1/modeles');
   expect(req.request.method).toEqual('GET');
   req.flush(modeles);
 });


  it('tester le get d\'un modèle avec le codeModele', () => {

    const mock = new ModeleServiceMock();
    var modele;
    const codeModele = 1;
    mock.getModele(codeModele).subscribe((res) =>{
      modele = res;
    });

    service.getModele(codeModele).subscribe((res)=> {
      expect (res).toEqual(modele);
    });
    // We set the expectations for the HttpClient mock

    const req = httpMock.expectOne('https://sayaradz.herokuapp.com/marques/modeles/' + codeModele);

    expect(req.request.method).toEqual('GET');

    req.flush(modele);
  });


  it('tester l\'ajout d\'un nouveau modèle avec POST', () => {

    const codeModele = "1";
    const designation = "Golf";

    service.ajouter(codeModele, designation).subscribe((res) => {
      expect (res).toEqual("");
    });
    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne(service.serviceUrlModeles);

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({CodeModele: codeModele, NomModele: designation});
    expect(req.request.headers).toEqual(new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token));


    req.flush("");

  });


  it('tester la modification d\'un modèle', () => {

    const codeModele = "1";
    const designation = "Golf";

    service.modifier(codeModele, designation).subscribe((res) => {
      expect (res).toEqual("");
    });
    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne(service.serviceUrlModele+codeModele.toString());
    req.flush("");
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual({CodeModele: codeModele, NomModele: designation});
    expect(req.request.headers).toEqual(new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token));


  });



  it('tester la suppression d\'un modèle', () => {

    const codeModele = "1";
    const designation = "Golf";

    service.supprimerModele(codeModele).subscribe((res) => {
      expect (res).toEqual("");
    });
    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne(service.serviceUrlModele+codeModele.toString());
    req.flush("");
    expect(req.request.method).toEqual('DELETE');
    expect(req.request.body).toBe(null);
    expect(req.request.headers).toEqual(new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token));


  });


});
