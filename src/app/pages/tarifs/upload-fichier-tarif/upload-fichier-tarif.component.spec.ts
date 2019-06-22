import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFichierTarifComponent } from './upload-fichier-tarif.component';

describe('UploadFichierTarifComponent', () => {
  let component: UploadFichierTarifComponent;
  let fixture: ComponentFixture<UploadFichierTarifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFichierTarifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFichierTarifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
