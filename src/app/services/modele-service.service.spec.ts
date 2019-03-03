import { TestBed } from '@angular/core/testing';

import { ModeleServiceService } from './modele-service.service';

describe('ModeleServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModeleServiceService = TestBed.get(ModeleServiceService);
    expect(service).toBeTruthy();
  });
});
