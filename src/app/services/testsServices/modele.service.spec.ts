import {getTestBed, inject, TestBed} from '@angular/core/testing';
import { ModeleService } from '../modele.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ModeleServiceMock} from '../../mocks/Modele.Service.mock';
import {ModeleDetail} from '../entites/modeleDetail.model';



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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  it('should return an Observable<ModeleDetail[]>', () => {

    const mock = new ModeleServiceMock();
      // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne('https://sayaradz.herokuapp.com/marques/1/modeles').flush({data: mock.getModeles()});

    service.getModeles().subscribe((modeles) => {
      expect(modeles.length).toBe(3);
    });

    });

});
