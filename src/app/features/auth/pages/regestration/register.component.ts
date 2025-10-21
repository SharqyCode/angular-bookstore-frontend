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
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['user', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService
        .registerUser(this.registerForm.value)
        .pipe(
          switchMap((res: any) => {
            console.log('✅ Registration success:', res);
            this.message = 'Registration successful!';

            // const loginData = {
            //   username: this.registerForm.value['username'],
            //   password: this.registerForm.value['password'],
            // };

            return this.authService.loginAuth(this.registerForm.value);
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
