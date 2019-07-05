import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCommandesComponent } from './all-commandes.component';

describe('AllCommandesComponent', () => {
  let component: AllCommandesComponent;
  let fixture: ComponentFixture<AllCommandesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCommandesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
