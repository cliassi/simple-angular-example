import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiRoot + '/';
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private storage: StorageService) {}

  login(user) {
    let body = new URLSearchParams();
    body.set('username', user.username);
    body.set('password', user.password);
    let options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };
    return this.http.post(
      this.baseUrl + 'auth/signin',
      body.toString(),
      options
    );
  }

  loggedIn(): boolean {
    const user = this.storage.get('user');
    if (user) {
      if (user.token) {
        return !this.jwtHelper.isTokenExpired(user.token);
      }
    }
    return false;
  }

  logout() {
    this.storage.clear();
    return of(true);
  }
}
