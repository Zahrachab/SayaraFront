import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterCouleurComponent } from './ajouter-couleur.component';

describe('AjouterCouleurComponent', () => {
  let component: AjouterCouleurComponent;
  let fixture: ComponentFixture<AjouterCouleurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterCouleurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterCouleurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
