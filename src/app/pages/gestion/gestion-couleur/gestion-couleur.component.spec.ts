import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCouleurComponent } from './gestion-couleur.component';

describe('GestionCouleurComponent', () => {
  let component: GestionCouleurComponent;
  let fixture: ComponentFixture<GestionCouleurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionCouleurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCouleurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
