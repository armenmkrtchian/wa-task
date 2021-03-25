import { AuthService } from './../shared/services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder,  Validators } from '@angular/forms';
import { createPasswordStrengthValidator } from '../shared/validators/password-strength.validator';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  submitted: boolean;
  message: string;
  form = this.fb.group({
    email: ['', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur'
    }],
    password: ['', [Validators.required, Validators.minLength(6),createPasswordStrengthValidator()]]
  });

  constructor(private fb: FormBuilder,
    public auth: AuthService,
    private router: Router) {
  }

  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard'])
      this.submitted = false
    }, () => {
      this.submitted = false
    })
  }
}
