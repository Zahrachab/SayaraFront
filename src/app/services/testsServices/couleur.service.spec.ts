import { TestBed } from '@angular/core/testing';

import { CouleurService } from '../couleur.service';
import {HttpClientModule} from '@angular/common/http';

describe('CouleurService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
  }));

  it('should be created', () => {
    const service: CouleurService = TestBed.get(CouleurService);
    expect(service).toBeTruthy();
  });
});
