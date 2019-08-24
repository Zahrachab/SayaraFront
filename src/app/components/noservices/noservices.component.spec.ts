import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NoservicesComponent} from './noservices.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

fdescribe('NoservicesComponent', () => {
  let component: NoservicesComponent;
  let fixture: ComponentFixture<NoservicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoservicesComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents().then(() => {

    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
