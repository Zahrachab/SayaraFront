import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterVersionComponent } from './ajouter-version.component';

describe('AjouterVersionComponent', () => {
  let component: AjouterVersionComponent;
  let fixture: ComponentFixture<AjouterVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
