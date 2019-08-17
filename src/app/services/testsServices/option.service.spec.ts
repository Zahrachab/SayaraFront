import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {OptionService} from '../option.service';
import {VersionServiceMock} from '../../mocks/Version.Service.mock';
import {OptionServiceMock} from '../../mocks/Option.Service.mock';
import {HttpHeaders} from '@angular/common/http';



fdescribe('OptionService', () => {
  let injector: TestBed;
  let service: OptionService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OptionService]
    });
    injector = getTestBed();
    service = injector.get(OptionService);
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

  it('tester le get de toutes les options associées à un modèle', () => {

    const mock = new OptionServiceMock();

    var options;
    const codeModele= "1";

    //mocker le résultat de getVersions
    mock.getOptions(codeModele).subscribe( (res) => {
      options = res;
    });

    service.getOptions(codeModele).subscribe((res)=> {
      expect (res).toEqual(options);
      expect(res.length).toEqual(options.length);
    });


    // expectations pour le HttpClient mock
    const req = httpMock.expectOne(service.serviceUrlOptions + codeModele + "/options");
    expect(req.request.method).toEqual('GET');
    req.flush(options);
  });


  it('tester le get de toutes les options compatibles avec une version', () => {

    const mock = new OptionServiceMock();

    var options;
    const codeVersion= "1";

    //mocker le résultat de getVersions
    mock.getOptionsVersion(codeVersion).subscribe( (res) => {
      options = res;
    });

    service.getOptionsVersion(codeVersion).subscribe((res)=> {
      expect (res).toEqual(options);
      expect(res.length).toEqual(options.length);
    });


    // expectations pour le HttpClient mock
    const req = httpMock.expectOne(service.serviceUrlOptions + 'versions/' + codeVersion + '/options');
    expect(req.request.method).toEqual('GET');
    req.flush(options);
  });


  it('tester le get de toutes les options associées à un modèle avec ligne tarifs', () => {

    const mock = new OptionServiceMock();

    var options;
    const codeModele= "1";

    //mocker le résultat de getVersions
    mock.getOptionsWithLigneTarifs(codeModele).subscribe( (res) => {
      options = res;
    });

    service.getOptionsWithLigneTarifs(codeModele).subscribe((res)=> {
      expect (res).toEqual(options);
      expect(res.length).toEqual(options.length);
    });


    // expectations pour le HttpClient mock
    const req = httpMock.expectOne(service.serviceUrlOptions + codeModele + "/options");
    expect(req.request.method).toEqual('GET');
    req.flush(options);
  });


  it('tester l\'ajout d\'une novelle option à un modèle avec POST', () => {

    const codeModele = "1";
    const codeOption = "23";
    const designation = "Air bag";

    service.ajouterOptionModele(codeOption, designation, codeModele).subscribe((res) => {
      expect (res).toEqual("");
    });
    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne(service.serviceUrlOptions + codeModele + '/options');

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({CodeOption: codeOption, NomOption: designation});
    expect(req.request.headers).toEqual(new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token));


    req.flush("");

  });


  it('tester l\'ajout d\'une option à une version avec POST', () => {

    const codeVersion = "1";
    const codeOption = "23";
    const designation = "Air bag";

    service.ajouter(codeOption, designation, codeVersion).subscribe((res) => {
      expect (res).toEqual("");
    });
    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne(service.serviceUrlOptions + 'versions/' + codeVersion + '/options');

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({CodeOption: codeOption, NomOption: designation});
    expect(req.request.headers).toEqual(new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token));


    req.flush("");

  });

  it('tester la modification dune  option', () => {

    const codeOption = "23";
    const designation = "Air Bag";

    service.modifier(codeOption, designation).subscribe((res) => {
      expect (res).toEqual("");
    });
    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne(service.serviceUrlOptions+ 'versions/options/' +codeOption);

    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual({CodeOption: codeOption, NomOption: designation});
    expect(req.request.headers).toEqual(new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token));


    req.flush("");

  });


  it('tester la suppression d\'une option d\'une version', () => {

    const codeVersion = "1";
    const codeOption = "23";


    service.supprimer(codeOption, codeVersion).subscribe((res) => {
      expect (res).toEqual("");
    });
    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne(service.serviceUrlOptions + 'versions/' + codeVersion +  '/options/' + codeOption);
    req.flush("");
    expect(req.request.method).toEqual('DELETE');
    expect(req.request.body).toBe(null);
    expect(req.request.headers).toEqual(new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token));


  });

  it('tester la suppression d\'une option d\'un modèle', () => {

    const codeModele = "1";
    const codeOption = "23";

    service.supprimerDuModele(codeOption, codeModele).subscribe((res) => {
      expect (res).toEqual("");
    });
    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne(service.serviceUrlOptions  + codeModele+  '/options/' + codeOption);
    req.flush("");
    expect(req.request.method).toEqual('DELETE');
    expect(req.request.body).toBe(null);
    expect(req.request.headers).toEqual(new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token));

  });
});
