import { TestBed, inject } from '@angular/core/testing';

import { UtilisateurGuard } from './utilisateur.guard';

describe('UtilisateurGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilisateurGuard]
    });
  });

  it('should ...', inject([UtilisateurGuard], (guard: UtilisateurGuard) => {
    expect(guard).toBeTruthy();
  }));
});
