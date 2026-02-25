import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PatientService } from '../../core/services/patient.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {

  patients$!: Observable<any[]>;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.patients$ = this.patientService.getPatients();
  }

  trackById(index: number, item: any) {
    return item.id;
  }
}
