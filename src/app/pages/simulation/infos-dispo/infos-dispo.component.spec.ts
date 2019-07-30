import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosDispoComponent } from './infos-dispo.component';

describe('InfosDispoComponent', () => {
  let component: InfosDispoComponent;
  let fixture: ComponentFixture<InfosDispoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfosDispoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosDispoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
