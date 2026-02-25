import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.auth.login(this.form.value).subscribe();
  }
}
