import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterOptionComponent } from './ajouter-option.component';

describe('AjouterOptionComponent', () => {
  let component: AjouterOptionComponent;
  let fixture: ComponentFixture<AjouterOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
