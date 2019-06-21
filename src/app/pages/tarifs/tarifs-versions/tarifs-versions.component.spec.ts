import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifsVersionsComponent } from './tarifs-versions.component';

describe('TarifsVersionsComponent', () => {
  let component: TarifsVersionsComponent;
  let fixture: ComponentFixture<TarifsVersionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifsVersionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifsVersionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
