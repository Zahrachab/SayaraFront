import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerOptionsComponent } from './supprimer-options.component';

describe('SupprimerOptionsComponent', () => {
  let component: SupprimerOptionsComponent;
  let fixture: ComponentFixture<SupprimerOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupprimerOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupprimerOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
