import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheModeleComponent } from './fiche-modele.component';

describe('FicheModeleComponent', () => {
  let component: FicheModeleComponent;
  let fixture: ComponentFixture<FicheModeleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheModeleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
