import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {StockService} from '../stock.service';
import {HttpHeaders} from '@angular/common/http';
import {CommandeServiceMock} from '../../mocks/commande.Service.mock';
import {StockServiceMock} from '../../mocks/Stock.Service.mock';
import {Option} from '../entites/option.model';



fdescribe('StockService', () => {
  let injector: TestBed;
  let service: StockService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StockService]
    });
    injector = getTestBed();
    service = injector.get(StockService);
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

  it('tester l\'upload d\'un fichier csv pour le stock', () => {

    const csv = new File([], "image.png");


    service.uploadCsv(csv).subscribe((res) => {
      expect(res).toEqual("");
    });
    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne(service.urlPostStock);

    expect(req.request.method).toEqual('POST');
    const formData = new FormData();
    formData.append('stockFile', csv);
    expect(req.request.body).toEqual(formData);
    expect(req.request.headers).toEqual(new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token));


    req.flush("");

  });




  it('tester le get du stock d\'une version ', () => {

    const mock = new StockServiceMock();

    var stock;
    const codeVersion = "3";
    mock.getStockVersion(codeVersion).subscribe((res) => {
      stock = res;
    });

    service.getStockVersion(codeVersion).subscribe((res) => {
      expect(res).toEqual(stock);
      expect(res.length).toEqual(stock.length);
    });


    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne(service.urlStockVehicules + codeVersion);
    expect(req.request.method).toEqual('GET');
    req.flush(stock);
  });



  it('tester le get des véhicules disponibles dans le stock qui correspondent aux critères données ', () => {

    const mock = new StockServiceMock();

    var stock;
    const codeVersion = "3";
    const codeCouleur = "34";
    const options = new Array<String>(2);
    options[0] = "option1";
    options[1] = "option2";
    mock.getVehiculesDispo(codeVersion, codeCouleur, options).subscribe((res) => {
      stock = res;
    });

    service.getVehiculesDispo(codeVersion, codeCouleur, options).subscribe((res) => {
      expect(res).toEqual(stock);
      expect(res.length).toEqual(stock.length);
    });


    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne(service.urlStockVehicules + 'disponible');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(  {codeVersion: codeVersion , codeCouleur: codeCouleur, Options: options});
    const tokenHeader = new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('utilisateur')).token);
    expect(req.request.headers).toEqual(tokenHeader);
    req.flush(stock);
  });



});
