import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionModeleComponent } from './gestion-modele.component';

describe('GestionModeleComponent', () => {
  let component: GestionModeleComponent;
  let fixture: ComponentFixture<GestionModeleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionModeleComponent ]
    })
    .compileComponents().then(() => {

    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
