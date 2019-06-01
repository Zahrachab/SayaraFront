import { TestBed } from '@angular/core/testing';

import { VersionService } from '../version.service';
import {HttpClientModule} from '@angular/common/http';

describe('VersionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
  }));

  it('should be created', () => {
    const service: VersionService = TestBed.get(VersionService);
    expect(service).toBeTruthy();
  });
});
