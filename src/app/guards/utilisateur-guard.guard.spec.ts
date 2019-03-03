import { TestBed, async, inject } from '@angular/core/testing';

import { UtilisateurGuardGuard } from './utilisateur-guard.guard';

describe('UtilisateurGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilisateurGuardGuard]
    });
  });

  it('should ...', inject([UtilisateurGuardGuard], (guard: UtilisateurGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
