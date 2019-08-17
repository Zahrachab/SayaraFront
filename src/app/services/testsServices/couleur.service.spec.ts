import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CouleurService} from '../couleur.service';
import {CouleurServiceMock} from '../../mocks/Couleur.Service.mock';
import {HttpHeaders} from '@angular/common/http';
import arrayWithExactContents = jasmine.arrayWithExactContents;



fdescribe('CouleurService', () => {
  let injector: TestBed;
  let service: CouleurService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CouleurService]
    });
    injector = getTestBed();
    service = injector.get(CouleurService);
    httpMock = injector.get(HttpTestingController);


  });

  beforeAll(() => {
    //mock du localStorage.getItem
    spyOn(localStorage, 'getItem').and.callFake((key: string): String => {
      return "{\"msg\":\"Authentification résussite !\",\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6NywiTWFpbCI6ImlzbGFtMUBlc2kuZHoiLCJGYWJyaWNhbnQiOjEsIlZhbGlkZSI6MSwiQmxvcXVlIjowLCJpYXQiOjE1NjU5NzU1MzksImV4cCI6MTU2NjA2MTkzOX0.6ZNCXRos6Uf1UBjUh7jtyWGD79t5WCl3sGsfDPzlVEY\",\"utilfab\":{\"IdUserF\":7,\"Mail\":\"islam1@esi.dz\",\"Nom\":\"BOUAYACHE\",\"Prenom\":\"Mohamed Islam\",\"Mdp\":\"$2a$10$vkxiJmerHv3QlRQeGRwoTesUVKuC7iD9YlYFZZ3ve8XayEqRxFaO.\",\"NumTel\":699415163,\"Fabricant\":1,\"Valide\":1,\"Bloque\":0,\"marque\":{\"NomMarque\":\"Volkswagen\"},\"images\":[{\"CheminImage\":\"http://res.cloudinary.com/hftzhatr4/image/upload/v1561070978/Utilisateurs_Fabricants/2019-06-20T22-49-34.672Z_Capture%20d%E2%80%99%C3%A9cran_2019-06-20_23-46-14.png.png\"}]}}";
    });
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('tester le get de toutes les couleurs associées à un modèle', () => {

    const mock = new CouleurServiceMock();

    var clrs;
    const codeModele= "1";

    //mocker le résultat de getVersions
    mock.getCouleurs(codeModele).subscribe( (res) => {
      clrs= res;
    });

    service.getCouleurs(codeModele).subscribe((res)=> {
      expect (res).toEqual(clrs);
      expect(res.length).toEqual(clrs.length);
    });


    // expectations pour le HttpClient mock
    const req = httpMock.expectOne(service.serviceUrl + codeModele + '/couleurs');
    expect(req.request.method).toEqual('GET');
    req.flush(clrs);
  });


  it('tester le get de toutes les couleurs compatibles avec une version', () => {

    const mock = new CouleurServiceMock();

    var clrs;
    const codeVersion= "1";

    //mocker le résultat de getVersions
    mock.getCouleursVersion(codeVersion).subscribe( (res) => {
      clrs = res;
    });

    service.getCouleursVersion(codeVersion).subscribe((res)=> {
      expect (res).toEqual(clrs);
      expect(res.length).toEqual(clrs.length);
    });


    // expectations pour le HttpClient mock
    const req = httpMock.expectOne(service.serviceUrl + 'versions/' + codeVersion + '/couleurs');
    expect(req.request.method).toEqual('GET');
    req.flush(clrs);
  });





  it('tester l\'ajout d\'une novelle couleur à un modèle avec POST', () => {

    const codeModele = "1";
    const codeCouleur = "23";
    const codeHexa = "567890";
    const designation = "Noir";

    service.ajouterCouleurModele(codeCouleur, designation,codeHexa, codeModele).subscribe((res) => {
      expect (res).toEqual("");
    });
    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne(service.serviceUrl + codeModele + '/couleurs');

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({CodeCouleur: codeCouleur, NomCouleur: designation, CodeHexa: codeHexa});
    expect(req.request.headers).toEqual(new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token));


    req.flush("");

  });


  it('tester l\'ajout d\'une novelle couleur à un modèle avec POST', () => {

    const codeVersion = "1";
    const codeCouleur = "23";

    service.ajouterCouleurVersion(codeCouleur,codeVersion).subscribe((res) => {
      expect (res).toEqual("");
    });
    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne(service.serviceUrl + 'versions/' + codeVersion + '/couleurs');

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({CodeCouleur: codeCouleur});
    expect(req.request.headers).toEqual(new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token));


    req.flush("");

  });


  it('tester la modification d\'une couleur ', () => {

    const codeCouleur = "23";
    const codeHexa = "567890";
    const designation = "Noir";

    service.modifierCouleur(codeCouleur, designation,codeHexa).subscribe((res) => {
      expect (res).toEqual("");
    });
    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne(service.serviceUrl + 'versions/couleurs/' + codeCouleur);

    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual({CodeCouleur: codeCouleur, NomCouleur: designation, CodeHexa: codeHexa});
    expect(req.request.headers).toEqual(new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token));


    req.flush("");

  });

  it('tester la suppression d\'une couleur d\'une version', () => {

    const codeVersion = "1";
    const codeCouleur = "23";


    service.supprimerVersion(codeCouleur, codeVersion).subscribe((res) => {
      expect (res).toEqual("");
    });
    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne(service.serviceUrl+ 'versions/' + codeVersion +  '/couleurs/' + codeCouleur);
    req.flush("");
    expect(req.request.method).toEqual('DELETE');
    expect(req.request.body).toBe(null);
    expect(req.request.headers).toEqual(new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token));


  });

  it('tester la suppression d\'une couleur d\'un modèle', () => {

    const codeModele = "1";
    const codeClr= "23";

    service.supprimerCouleurModele(codeClr, codeModele).subscribe((res) => {
      expect (res).toEqual("");
    });
    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne(service.serviceUrl  + codeModele+  '/couleurs/' + codeClr);
    req.flush("");
    expect(req.request.method).toEqual('DELETE');
    expect(req.request.body).toBe(null);
    expect(req.request.headers).toEqual(new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token));

  });
});
