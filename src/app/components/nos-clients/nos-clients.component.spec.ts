import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NosClientsComponent} from './nos-clients.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

fdescribe('NosClientsComponent', () => {
  let component: NosClientsComponent;
  let fixture: ComponentFixture<NosClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NosClientsComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents().then(() => {

    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NosClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
