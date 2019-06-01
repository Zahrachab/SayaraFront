import { TestBed } from '@angular/core/testing';

import { AuthentificationService } from '../authentification.service';
import {HttpClientModule} from '@angular/common/http';

describe('AuthentificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
  }));

  it('should be created', () => {
    const service: AuthentificationService = TestBed.get(AuthentificationService);
    expect(service).toBeTruthy();
  });
});
