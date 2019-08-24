import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OfferComponent} from './offer.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

fdescribe('OfferComponent', () => {
  let component: OfferComponent;
  let fixture: ComponentFixture<OfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OfferComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents().then(() => {

    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
