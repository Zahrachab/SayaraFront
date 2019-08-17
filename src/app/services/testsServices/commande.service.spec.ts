import {getTestBed, TestBed} from '@angular/core/testing';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CommandeService} from '../commande.service';
import {CommandeServiceMock} from '../../mocks/commande.Service.mock';
import {HttpHeaders} from '@angular/common/http';


fdescribe('CommandeService', () => {
  let injector: TestBed;
  let service: CommandeService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommandeService]
    });
    injector = getTestBed();
    service = injector.get(CommandeService);
    httpMock = injector.get(HttpTestingController);


  });

  beforeAll(() => {
    //mock du localStorage.getItem
    spyOn(localStorage, 'getItem').and.callFake((key: string): String => {
      return "{\"msg\":\"Authentification résussite !\",\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6NywiTWFpbCI6ImlzbGFtMUBlc2kuZHoiLCJGYWJyaWNhbnQiOjEsIlZhbGlkZSI6MSwiQmxvcXVlIjowLCJpYXQiOjE1NjU5NzU1MzksImV4cCI6MTU2NjA2MTkzOX0.6ZNCXRos6Uf1UBjUh7jtyWGD79t5WCl3sGsfDPzlVEY\",\"utilfab\":{\"IdUserF\":7,\"Mail\":\"islam1@esi.dz\",\"Nom\":\"BOUAYACHE\",\"Prenom\":\"Mohamed Islam\",\"Mdp\":\"$2a$10$vkxiJmerHv3QlRQeGRwoTesUVKuC7iD9YlYFZZ3ve8XayEqRxFaO.\",\"NumTel\":699415163,\"Fabricant\":1,\"Valide\":1,\"Bloque\":0,\"marque\":{\"NomMarque\":\"Volkswagen\"},\"images\":[{\"CheminImage\":\"http://res.cloudinary.com/hftzhatr4/image/upload/v1561070978/Utilisateurs_Fabricants/2019-06-20T22-49-34.672Z_Capture%20d%E2%80%99%C3%A9cran_2019-06-20_23-46-14.png.png\"}]}}";
    });
  });


  it('tester le get de toutes les commandes ', () => {

    const mock = new CommandeServiceMock();

    var commandes;
    mock.getAllCommandes().subscribe((res) => {
      commandes = res;
    });

    service.getAllCommandes().subscribe((res) => {
      expect(res).toEqual(commandes);
      expect(res.length).toEqual(commandes.length);
    });


    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne(service.urlCommandes);
    expect(req.request.method).toEqual('GET');
    req.flush(commandes);
  });


  it('tester le get des nouvelles commandes ', () => {

    const mock = new CommandeServiceMock();

    var commandes;
    mock.getCommandesNouvelles().subscribe((res) => {
      commandes = res;
    });

    service.getCommandesNouvelles().subscribe((res) => {
      expect(res).toEqual(commandes);
      expect(res.length).toEqual(commandes.length);
    });


    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne(service.urlNouvellesCommandes);
    expect(req.request.method).toEqual('GET');
    req.flush(commandes);
  });


  it('tester le get des commandes annullées ', () => {

    const mock = new CommandeServiceMock();

    var commandes;
    mock.getCommandesAnnulles().subscribe((res) => {
      commandes = res;
    });

    service.getCommandesAnnulles().subscribe((res) => {
      expect(res).toEqual(commandes);
      expect(res.length).toEqual(commandes.length);
    });


    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne(service.urlCommandesAnnulles);
    expect(req.request.method).toEqual('GET');
    req.flush(commandes);
  });


  it('tester le get des commandes validées ', () => {

    const mock = new CommandeServiceMock();

    var commandes;
    mock.getCommandesValides().subscribe((res) => {
      commandes = res;
    });

    service.getCommandesValides().subscribe((res) => {
      expect(res).toEqual(commandes);
      expect(res.length).toEqual(commandes.length);
    });


    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne(service.urlCommandesValides);
    expect(req.request.method).toEqual('GET');
    req.flush(commandes);
  });


  it('tester la validation d\'une commande', () => {

    const idCommande = "2";

    service.validerCommande(idCommande).subscribe((res) => {
      expect(res).toEqual("");
    });
    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne(service.url + '/' + idCommande + '/valider');
    req.flush("");
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual({headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token)});

  });


  it('tester le rejet d\'une commande', () => {

    const idCommande = "2";

    service.rejeterCommande(idCommande).subscribe((res) => {
      expect(res).toEqual("");
    });
    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne(service.url + '/' + idCommande + '/rejeter');
    req.flush("");
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual({headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token)});


  });

});
