import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionVersionComponent } from './gestion-version.component';

describe('GestionVersionComponent', () => {
  let component: GestionVersionComponent;
  let fixture: ComponentFixture<GestionVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
