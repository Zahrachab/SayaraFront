import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterModeleComponent } from './ajouterModele.component';

describe('AjouterModeleComponent', () => {
  let component: AjouterModeleComponent;
  let fixture: ComponentFixture<AjouterModeleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterModeleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
