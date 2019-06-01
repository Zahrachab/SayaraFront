import { TestBed } from '@angular/core/testing';

import { ImageService } from '../image.service';
import {HttpClientModule} from '@angular/common/http';

describe('ImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
  }));

  it('should be created', () => {
    const service: ImageService = TestBed.get(ImageService);
    expect(service).toBeTruthy();
  });
});
