import { Component, computed, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent {

  public menuItems: MenuItem[] = [];

  private authService = inject(AuthService);
  public user = computed(() => this.authService.currentUser());

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Gráficos',
        icon: 'pi pi-bars',
        items: [
          {
            label: 'Barras',
            icon: 'pi pi-chart-bar',
            routerLink: 'charts/bar-chart'
          },
          {
            label: 'Circular',
            icon: 'pi pi-chart-pie',
            routerLink: 'charts/pie-chart'
          },
          {
            label: 'Líneas',
            icon: 'pi pi-chart-line',
            routerLink: 'charts/line-chart'
          },
        ]
      }
    ];
  }

  onLogout() {
    this.authService.logout();
  }
}
