import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerVersionComponent } from './supprimer-version.component';

describe('SupprimerVersionComponent', () => {
  let component: SupprimerVersionComponent;
  let fixture: ComponentFixture<SupprimerVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupprimerVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupprimerVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
