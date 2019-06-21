import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifsOptionsComponent } from './tarifs-options.component';

describe('TarifsOptionsComponent', () => {
  let component: TarifsOptionsComponent;
  let fixture: ComponentFixture<TarifsOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifsOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifsOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
