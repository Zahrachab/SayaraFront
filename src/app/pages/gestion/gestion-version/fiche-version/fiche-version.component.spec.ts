import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheVersionComponent } from './fiche-version.component';

describe('FicheVersionComponent', () => {
  let component: FicheVersionComponent;
  let fixture: ComponentFixture<FicheVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
