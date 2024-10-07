import { Component, computed, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  public menuItems: MenuItem[] = [];

  private readonly authService = inject(AuthService);
  public user = computed(() => this.authService.currentUser());

  get isUserAuthenticated() {
    return this.authService.isUserAuthenticated;
  }

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: 'dashboard/home',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Telemetría',
        icon: 'pi pi-gauge',
        routerLink: 'dashboard/gauge',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Gráficos',
        icon: 'pi pi-chart-line',
        routerLink: 'dashboard/charts',
        routerLinkActiveOptions: { exact: true }
      },
    ];
  }

  onLogout() {
    this.authService.logout();
  }
}
