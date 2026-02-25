import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppointmentDto } from '../../../core/dtos/appointment.dto';
import { debounceTime, Observable, Subject, switchMap, startWith } from 'rxjs';
import { AppointmentService } from '../../../core/services/appointment.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './appointment-list.component.html',
})
export class AppointmentListComponent implements OnInit {

  appointments$!: Observable<AppointmentDto[]>;
  private search$ = new Subject<string>();

  constructor(private service: AppointmentService) {}

  ngOnInit(): void {
    this.appointments$ = this.search$.pipe(
      startWith(''), // initial load
      debounceTime(300),
      switchMap(term => this.service.search(term)) // ✅ NO async
    );
  }

  trackById(index: number, item: AppointmentDto) {
    return item.id;
  }

  search(term: string): void {
    this.search$.next(term);
  }
}
