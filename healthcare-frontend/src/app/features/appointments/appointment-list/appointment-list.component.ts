import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppointmentDto } from '../../../core/dtos/appointment.dto';
import { debounceTime, Observable, Subject, switchMap } from 'rxjs';
import { AppointmentService } from '../../../core/services/appointment.service';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './appointment-list.component.html',
})
export class AppointmentListComponent implements OnInit {

  appointments$!: Observable<AppointmentDto[]>;
  private search$ = new Subject<string>();

  constructor(private service: AppointmentService) {}

  ngOnInit() {
    this.appointments$ = this.search$.pipe(
      debounceTime(300),
      switchMap(async (term) => this.service.search(term))
    );
  }

  trackById(index: number, item: AppointmentDto) {
    return item.patientId;
  }

  search(term: string) {
    this.search$.next(term);
  }
}
