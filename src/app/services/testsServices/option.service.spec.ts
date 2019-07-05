import { TestBed } from '@angular/core/testing';

import { OptionService } from '../option.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ModeleServiceMock} from '../../mocks/Modele.Service.mock';

describe('OptionService', () => {

  const mock = new ModeleServiceMock();
  const options = mock.getModele('1');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OptionService]
    });
  });

  it('Tester le get des options d\'un modèle', () => {
    const service: OptionService = TestBed.get(OptionService);
    const http = TestBed.get(HttpTestingController);
    let response;
    http.expectOne(req => req.method === 'GET' && req.url === 'https://sayaradz.herokuapp.com/marques/modeles/1').flush(options);
    service.getOptions('1').subscribe((res) => {
      response = res;
      expect(response).toEqual(options);
    });
  });
});


