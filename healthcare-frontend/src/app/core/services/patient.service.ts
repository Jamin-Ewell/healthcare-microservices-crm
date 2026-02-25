import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { tap, debounceTime, switchMap } from 'rxjs/operators';
import { AppointmentDto } from '../dtos/appointment.dto';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiUrl = 'https://localhost:5001/api/patients';
  private cache = new Map<string, any[]>();

  constructor(private http: HttpClient) {}

  getPatients(): Observable<any[]> {

    const cached = this.cache.get('patients');

    if (cached) return of(cached);

    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        tap(data => this.cache.set('patients', data))
      );
  }

  search(term: string): Observable<AppointmentDto[]> {
  return this.http.get<AppointmentDto[]>(
    `${this.apiUrl}?search=${term}`
  );
}

  searchPatients(term$: Subject<string>): Observable<any[]> {
    return term$.pipe(
      debounceTime(400),
      switchMap(term =>
        this.http.get<any[]>(`${this.apiUrl}?search=${term}`)
      )
    );
  }
}
