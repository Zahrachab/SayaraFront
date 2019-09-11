import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FooterComponent} from './footer.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

fdescribe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents().then(() => {

    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
