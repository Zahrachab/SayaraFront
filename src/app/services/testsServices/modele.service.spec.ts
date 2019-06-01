import { TestBed } from '@angular/core/testing';

import { ModeleService } from '../modele.service';
import {HttpClientModule} from '@angular/common/http';

describe('ModeleService', () => {
  beforeEach(() => TestBed.configureTestingModule(
    {
      imports: [HttpClientModule],
    }));

  it('should be created', () => {
    const service: ModeleService = TestBed.get(ModeleService);
    expect(service).toBeTruthy();
  });
});
