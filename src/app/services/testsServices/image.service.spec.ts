import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ImageService} from '../image.service';
import {HttpHeaders} from '@angular/common/http';



fdescribe('ImageService', () => {
  let injector: TestBed;
  let service: ImageService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImageService]
    });
    injector = getTestBed();
    service = injector.get(ImageService);
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

  it('tester l\'upload d\'une photo à une couleur/version', () => {

    const codeVersion = "1";
    const codeCouleur = "23";
    const img = new File([], "image.png");


    service.uploadImage(img, codeVersion, codeCouleur).subscribe((res) => {
      expect (res).toEqual("");
    });
    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne(service.imagesVersionUrl + codeVersion);

    expect(req.request.method).toEqual('POST');
    const formData = new FormData();
    formData.append('imageVersion', img);
    formData.append('CodeCouleur', codeCouleur);
    expect(req.request.body).toEqual(formData);
    expect(req.request.headers).toEqual(new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token));


    req.flush("");

  });



  it('tester la suppression d\'une photo', () => {

    const codeVersion = "1";
    const idImage = "2";
    const codeCouleur = "23"


    service.supprimerImage(idImage, codeVersion, codeCouleur).subscribe((res) => {
      expect (res).toEqual("");
    });
    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne(service.url + '/images/' + idImage);
    req.flush("");
    expect(req.request.method).toEqual('DELETE');
    expect(req.request.body).toBe(null);
    expect(req.request.headers).toEqual(new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token));


  });

});
