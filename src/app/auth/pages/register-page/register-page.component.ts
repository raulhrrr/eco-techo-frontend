import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public form: FormGroup = this.fb.group({
    name: [
      'Raul',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    email: ['raul@mail.com', [Validators.required, Validators.email]],
    password: [
      '123456',
      [Validators.required, Validators.minLength(6), Validators.maxLength(20)],
    ],
  });

  register() {
    const { name, email, password } = this.form.value;

    this.authService.register(name, email, password).subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: (message) => {
        Swal.fire('Error', message, 'error');
      },
    });
  }
}
