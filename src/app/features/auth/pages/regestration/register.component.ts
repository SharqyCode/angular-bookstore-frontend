import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ObservableInput, switchMap } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  message = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // ✅ Added email
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService
        .registerUser(this.registerForm.value)
        .pipe(
          // After successful registration, switch to login observable
          switchMap((res: any) => {
            console.log('✅ Registration success:', res);
            this.message = 'Registration successful!';
            const loginData = {
              username: res.data.username,
              password: res.data.password,
            };
            console.log('res', res);
            console.log('loginData', loginData);

            return this.authService.loginAuth(loginData);
          })
        )
        .subscribe({
          next: (loginRes) => {
            console.log('✅ Auto-login success:', loginRes);
            this.router.navigate(['/books']);
          },
          error: (err) => {
            console.error('❌ Error:', err);
            this.message = 'Failed to register or login. Please try again.';
          },
        });
    }
  }
}
