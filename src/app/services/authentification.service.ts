import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {User} from './entites/user.model';



@Injectable({
  providedIn: 'root'
})

export class AuthentificationService {
  get urlLogin(): string {
    return this._urlLogin;
  }


  constructor(private http: HttpClient, private injector: Injector) {
    AuthentificationService.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    AuthentificationService.currentUser = AuthentificationService.currentUserSubject.asObservable();
  }

  public static get currentUserValue(): User {
    return AuthentificationService.currentUserSubject.value;
  }
  public static currentUser: Observable<User>;
  private static currentUserSubject: BehaviorSubject<User>;
  private url =  "https://sayaradz.herokuapp.com";
  private _urlLogin = this.url + '/auth/utilfab';

  login(username: string, password: string) {

    return this.http.post<any>(this._urlLogin, { Mail: username, Mdp : password }).pipe(
      map(user => {

        console.log("user " + user.toString() );
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
