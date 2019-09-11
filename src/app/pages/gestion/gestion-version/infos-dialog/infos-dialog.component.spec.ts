import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosDialogComponent } from './infos-dialog.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

fdescribe('InfosDialogComponent', () => {
  let component: InfosDialogComponent;
  let fixture: ComponentFixture<InfosDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfosDialogComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
