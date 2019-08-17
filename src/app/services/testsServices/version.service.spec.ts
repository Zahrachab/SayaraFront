import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {VersionServiceMock} from '../../mocks/Version.Service.mock';
import {HttpHeaders} from '@angular/common/http';
import {VersionService} from '../version.service';


fdescribe('VersionService', () => {
  let injector: TestBed;
  let service: VersionService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VersionService]
    });
    injector = getTestBed();
    service = injector.get(VersionService);
    httpMock = injector.get(HttpTestingController);


  });

  beforeAll(() =>{
    //mock du localStorage.getItem
    spyOn(localStorage, 'getItem').and.callFake((key: string): String => {
      return "{\"msg\":\"Authentification résussite !\",\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6NywiTWFpbCI6ImlzbGFtMUBlc2kuZHoiLCJGYWJyaWNhbnQiOjEsIlZhbGlkZSI6MSwiQmxvcXVlIjowLCJpYXQiOjE1NjU5NzU1MzksImV4cCI6MTU2NjA2MTkzOX0.6ZNCXRos6Uf1UBjUh7jtyWGD79t5WCl3sGsfDPzlVEY\",\"utilfab\":{\"IdUserF\":7,\"Mail\":\"islam1@esi.dz\",\"Nom\":\"BOUAYACHE\",\"Prenom\":\"Mohamed Islam\",\"Mdp\":\"$2a$10$vkxiJmerHv3QlRQeGRwoTesUVKuC7iD9YlYFZZ3ve8XayEqRxFaO.\",\"NumTel\":699415163,\"Fabricant\":1,\"Valide\":1,\"Bloque\":0,\"marque\":{\"NomMarque\":\"Volkswagen\"},\"images\":[{\"CheminImage\":\"http://res.cloudinary.com/hftzhatr4/image/upload/v1561070978/Utilisateurs_Fabricants/2019-06-20T22-49-34.672Z_Capture%20d%E2%80%99%C3%A9cran_2019-06-20_23-46-14.png.png\"}]}}";
    });
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('tester le get de toutes les versions', () => {

    const mock = new VersionServiceMock();

    var versions;
    const codeModele= "1";

    //mocker le résultat de getVersions
    mock.getVersions(codeModele).subscribe( (res) => {
      versions = res;
    });

    service.getVersions(codeModele).subscribe((res)=> {
      expect (res).toEqual(versions);
    });


    // expectations pour le HttpClient mock
    const req = httpMock.expectOne(service.urlVersionDetails+ codeModele + "/versions");
    expect(req.request.method).toEqual('GET');
    req.flush(versions);
  });



});
