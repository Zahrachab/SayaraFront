import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router} from '@angular/router';
import {AuthentificationService} from '../services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurGuard implements CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthentificationService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = AuthentificationService.currentUserValue;
    alert(currentUser);
    if (currentUser) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
