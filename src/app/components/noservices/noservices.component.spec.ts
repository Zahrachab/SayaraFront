import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoservicesComponent } from './noservices.component';

describe('NoservicesComponent', () => {
  let component: NoservicesComponent;
  let fixture: ComponentFixture<NoservicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoservicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
