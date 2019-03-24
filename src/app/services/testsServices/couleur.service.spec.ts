import { TestBed } from '@angular/core/testing';

import { CouleurService } from '../couleur.service';

describe('CouleurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CouleurService = TestBed.get(CouleurService);
    expect(service).toBeTruthy();
  });
});
