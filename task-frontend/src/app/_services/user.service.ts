import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private isUserLogged$ = new Subject();

  getPublicContent(): Observable<any> {
    return this.http.get('all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get('user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get('mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get('admin', { responseType: 'text' });
  }

  get isLoggedAs(): Observable<any> {
    return this.isUserLogged$.asObservable();
  }

  changeIsLoggedAs(user: string): void {
    this.isUserLogged$.next(user);
  }
}
