import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  cache: any;
  gateway: any;

  getPatients() {
  const cached = this.cache.get('patients');
  if (cached) return of(cached);

  return this.gateway.get('patients').pipe(
    tap(data => this.cache.set('patients', data))
  );
}
}
