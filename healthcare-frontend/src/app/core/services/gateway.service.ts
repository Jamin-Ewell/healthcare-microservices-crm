import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GatewayService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string) {
    return this.http.get<T>(`${this.api}/${endpoint}`, {
      withCredentials: true
    });
  }

  post<T>(endpoint: string, body: any) {
    return this.http.post<T>(`${this.api}/${endpoint}`, body, {
      withCredentials: true
    });
  }

  put<T>(endpoint: string, body: any) {
    return this.http.put<T>(`${this.api}/${endpoint}`, body, {
      withCredentials: true
    });
  }
}
