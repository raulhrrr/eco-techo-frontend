import { Component, computed, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styles: [],
})
export class MenuComponent {
  public menuItems: MenuItem[] = [];

  private readonly authService = inject(AuthService);
  public user = computed(() => this.authService.currentUser());

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: 'dashboard/',
      },
      {
        label: 'Telemetría',
        icon: 'pi pi-gauge',
        routerLink: 'dashboard/gauge',
      },
      {
        label: 'Gráficos',
        icon: 'pi pi-bars',
        items: [
          {
            label: 'Temperatura',
            icon: 'pi pi-chart-line',
            routerLink: 'dashboard/charts/temperature',
          },
          {
            label: 'Humedad',
            icon: 'pi pi-chart-line',
            routerLink: 'dashboard/charts/humidity',
          },
          {
            label: 'Presión',
            icon: 'pi pi-chart-line',
            routerLink: 'dashboard/charts/pressure',
          },
          {
            label: 'Resistencia al gas',
            icon: 'pi pi-chart-line',
            routerLink: 'dashboard/charts/gas-resistance',
          }
        ],
      },
    ];
  }

  onLogout() {
    this.authService.logout();
  }
}
