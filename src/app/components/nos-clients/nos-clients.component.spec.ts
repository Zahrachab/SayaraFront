import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NosClientsComponent} from './nos-clients.component';

describe('NosClientsComponent', () => {
  let component: NosClientsComponent;
  let fixture: ComponentFixture<NosClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NosClientsComponent]
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
