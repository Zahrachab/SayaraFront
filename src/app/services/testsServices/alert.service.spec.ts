import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AlertService} from '../alert.service';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';


fdescribe('AlertService', () => {
  let injector: TestBed;
  let service: AlertService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule.forRoot([])],
      providers: [AlertService, {provide: APP_BASE_HREF, useValue : '/'}]
    });
    injector = getTestBed();
    service = injector.get(AlertService);
    httpMock = injector.get(HttpTestingController);


  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
