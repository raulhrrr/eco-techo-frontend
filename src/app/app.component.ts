import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  public finishedAuthCheck = computed<boolean>(() => {
    console.log(this.authService.authStatus())
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
        this.router.navigateByUrl('/charts/');
        return;

      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return;

    }




  });


}
