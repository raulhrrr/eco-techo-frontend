import { AuthService } from 'src/app/auth/services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ROLES } from 'src/app/constants/roles';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: ``
})
export class UsersComponent implements OnInit {
  isAdminRole = false;
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    password: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    role: [ROLES.ALERT, [Validators.required]],
  });

  ngOnInit() {
    this.onRoleValueChanges();
  }

  get roles() {
    return Object.values(ROLES);
  }

  onRoleValueChanges() {
    this.form.get('role')?.valueChanges.subscribe(role => {
      this.isAdminRole = role.name === ROLES.ADMIN.name;
      if (this.isAdminRole) {
        this.form.get('password')?.enable();
      } else {
        this.form.get('password')?.disable();
      }
    });
  }

  onSave() {
    const { name, email, password, role } = this.form.value;

    this.authService.register(name, email, password, role.id).subscribe({
      next: ({ message }) => { Swal.fire('Éxito', message, 'success'); },
      error: (message) => { Swal.fire('Error', message, 'error'); },
    });
  }
}
