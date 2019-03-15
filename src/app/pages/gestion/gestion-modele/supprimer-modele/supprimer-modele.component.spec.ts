import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerModeleComponent } from './supprimer-modele.component';

describe('SupprimerModeleComponent', () => {
  let component: SupprimerModeleComponent;
  let fixture: ComponentFixture<SupprimerModeleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupprimerModeleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupprimerModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
