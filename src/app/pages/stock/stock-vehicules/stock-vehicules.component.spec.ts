import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockVehiculesComponent } from './stock-vehicules.component';

describe('StockVehiculesComponent', () => {
  let component: StockVehiculesComponent;
  let fixture: ComponentFixture<StockVehiculesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockVehiculesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockVehiculesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
