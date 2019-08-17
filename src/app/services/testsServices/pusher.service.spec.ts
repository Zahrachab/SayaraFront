import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {PusherService} from '../pusher.service';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';





fdescribe('PusherService', () => {
  let injector: TestBed;
  let service: PusherService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule.forRoot([])],
      providers: [PusherService,  {provide: APP_BASE_HREF, useValue : '/app'}]
    });
    injector = getTestBed();
    service = injector.get(PusherService);
    httpMock = injector.get(HttpTestingController);


  });


  beforeAll(() => {
    var store = {};

    spyOn(localStorage, 'getItem').and.callFake( (key:string):String => {
      return "{\"msg\":\"Authentification résussite !\",\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6NywiTWFpbCI6ImlzbGFtMUBlc2kuZHoiLCJGYWJyaWNhbnQiOjEsIlZhbGlkZSI6MSwiQmxvcXVlIjowLCJpYXQiOjE1NjU5NzU1MzksImV4cCI6MTU2NjA2MTkzOX0.6ZNCXRos6Uf1UBjUh7jtyWGD79t5WCl3sGsfDPzlVEY\",\"utilfab\":{\"IdUserF\":7,\"Mail\":\"islam1@esi.dz\",\"Nom\":\"BOUAYACHE\",\"Prenom\":\"Mohamed Islam\",\"Mdp\":\"$2a$10$vkxiJmerHv3QlRQeGRwoTesUVKuC7iD9YlYFZZ3ve8XayEqRxFaO.\",\"NumTel\":699415163,\"Fabricant\":1,\"Valide\":1,\"Bloque\":0,\"marque\":{\"NomMarque\":\"Volkswagen\"},\"images\":[{\"CheminImage\":\"http://res.cloudinary.com/hftzhatr4/image/upload/v1561070978/Utilisateurs_Fabricants/2019-06-20T22-49-34.672Z_Capture%20d%E2%80%99%C3%A9cran_2019-06-20_23-46-14.png.png\"}]}}";
    });
    spyOn(localStorage, 'removeItem').and.callFake((key:string):void =>  {
      delete store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
      return store[key] = <string>value;
    });
    spyOn(localStorage, 'clear').and.callFake(() =>  {
      store = {};
    });
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
