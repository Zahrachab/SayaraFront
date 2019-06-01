import { TestBed } from '@angular/core/testing';

import { OptionService } from '../option.service';
import {HttpClientModule} from '@angular/common/http';

describe('OptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
  }));

  it('should be created', () => {
    const service: OptionService = TestBed.get(OptionService);
    expect(service).toBeTruthy();
  });
});
