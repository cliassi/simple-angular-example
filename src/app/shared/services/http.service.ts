import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseUrl = environment.apiRoot + '/';
  public loading = false;
  public loadingMessage = 'Loading...';
  constructor(private http: HttpClient, private authService: AuthService) {
    this.initAfterLogin();
  }

  initAfterLogin() {
    if (this.authService.loggedIn()) {
    }
  }

  public getAll(endpoint) {
    this.loading = true;
    return this.http.get(this.baseUrl + endpoint);
  }
  create(endpoint, model) {
    return this.post(endpoint, model);
  }

  //Post
  postSimple(endpoint) {
    this.loading = true;
    return this.http.post(this.baseUrl + endpoint, {});
  }
  //Post
  post(endpoint, model) {
    this.loading = true;
    return this.http.post(this.baseUrl + endpoint, model);
  }

  //READ
  public get(endpoint, model?) {
    this.loading = true;
    if (model) {
      return this.http.get(this.baseUrl + endpoint + '/' + model.id);
    }
    return this.http.get(this.baseUrl + endpoint);
  }

  //Update
  public update(endpoint, model) {
    this.loading = true;
    return this.http.put(this.baseUrl + endpoint + '/' + model.id, model);
  }

  //Delete
  public delete(endpoint, model) {
    this.loading = true;
    return this.http.delete(this.baseUrl + endpoint + '/' + model.id);
  }

  //Patch
  public patch(endpoint, model) {
    this.loading = true;
    return this.http.patch(this.baseUrl + endpoint, model);
  }
}
