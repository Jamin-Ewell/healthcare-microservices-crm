import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:5001/api/auth';

  // Angular 17 reactive state
  private _isAuthenticated = signal<boolean>(false);
  isAuthenticated = this._isAuthenticated.asReadonly();

  constructor(private http: HttpClient) {}

  login(dto: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, dto, {
      withCredentials: true
    }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this._isAuthenticated.set(true);
      })
    );
  }

  register(dto: any) {
    return this.http.post(`${this.apiUrl}/register`, dto);
  }

  logout() {
    localStorage.removeItem('token');
    this._isAuthenticated.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
