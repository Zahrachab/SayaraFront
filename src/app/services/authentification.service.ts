import {Injectable, Injector} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class AuthentificationService {
  private url = this.injector.get('url');

  constructor(private http: HttpClient, private injector: Injector) { }
  login(username: string, password: string) {

    return this.http.post<any>(this.url + '/auth/utilfab', { Mail: username, Mdp : password }).pipe(
      map(user => {
        //   login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('utilisateur', JSON.stringify(user));
        }
        return user;
      }));
  }

   logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('utilisateur');
  }
}
