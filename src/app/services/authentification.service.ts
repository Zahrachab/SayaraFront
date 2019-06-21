import {Injectable, Injector} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from './entites/user.model';



@Injectable({
  providedIn: 'root'
})

export class AuthentificationService {

  constructor(private http: HttpClient, private injector: Injector) {
    AuthentificationService.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    AuthentificationService.currentUser = AuthentificationService.currentUserSubject.asObservable();
  }

  public static get currentUserValue(): User {
    return AuthentificationService.currentUserSubject.value;
  }
  public static currentUser: Observable<User>;
  private static currentUserSubject: BehaviorSubject<User>;
  private url = this.injector.get('url');

  login(username: string, password: string) {

    return this.http.post<any>(this.url + '/auth/utilfab', { Mail: username, Mdp : password }).pipe(
      map(user => {
        //   login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('utilisateur', JSON.stringify(user));
          AuthentificationService.currentUserSubject.next(user);
        }
        return user;
      }));
  }

   logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('utilisateur');
    AuthentificationService.currentUserSubject.next(null);
  }
}
