import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifsCouleursComponent } from './tarifs-couleurs.component';

describe('TarifsCouleursComponent', () => {
  let component: TarifsCouleursComponent;
  let fixture: ComponentFixture<TarifsCouleursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifsCouleursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifsCouleursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
