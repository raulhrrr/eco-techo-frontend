import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly primengConfig = inject(PrimeNGConfig);
  private readonly isAuthEnabled = environment.isAuthEnabled;

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  get isUserAuthenticated() {
    return this.authService.isUserAuthenticated;
  }

  public finishedAuthCheck = computed<boolean>(() => {
    console.log(this.authService.authStatus());
    if (this.authService.authStatus() === AuthStatus.checking) {
      return false;
    }

    return true;
  });

  public authStatusChangedEffect = effect(() => {
    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard/');
        return;

      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl(this.isAuthEnabled ? '/auth/login' : '/dashboard');
        return;
    }
  });
}
