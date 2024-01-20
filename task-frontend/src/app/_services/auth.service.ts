import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from '../_services/storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      '/api/access/login',
      {
        username,
        password,
      },
      httpOptions,
    );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(
      '/api/access/register',
      {
        username,
        password,
      },
      httpOptions,
    );
  }

  logout(): Observable<any> {
    return this.http.post('signout', {}, httpOptions);
  }

  refreshToken() {
    return this.http.post('refreshtoken', {}, httpOptions);
  }

  public isAuthenticated(): boolean {
    const { token } = this.storageService.getUser();

    console.log('AuthService:isAuthenticated():token', token);

    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    console.log('AuthService:isAuthenticated():isExpired', isExpired);

    if (isExpired) {
      this.storageService.clean();
    }

    return !isExpired;
  }
}
