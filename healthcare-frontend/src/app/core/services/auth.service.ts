import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:5001/api/auth';

  private _isAuthenticated = signal<boolean>(false);
  isAuthenticatedSignal = this._isAuthenticated.asReadonly();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this._isAuthenticated.set(!!localStorage.getItem('token'));
  }

  login(dto: { email: string; password: string }) {
    return this.http.post<any>(`${this.apiUrl}/login`, dto, {
      withCredentials: true
    }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this._isAuthenticated.set(true);
        this.router.navigate(['/dashboard']);
      })
    );
  }

  register(dto: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/register`, dto);
  }

  logout() {
    localStorage.removeItem('token');
    this._isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
