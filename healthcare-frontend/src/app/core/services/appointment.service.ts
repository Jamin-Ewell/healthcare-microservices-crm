import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentDto } from '../dtos/appointment.dto';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'https://localhost:5001/api/appointments';

  constructor(private http: HttpClient) {}

  search(term: string): Observable<AppointmentDto[]> {

    return this.http.get<AppointmentDto[]>(
      `${this.apiUrl}?search=${term}`
    );

  }
}
