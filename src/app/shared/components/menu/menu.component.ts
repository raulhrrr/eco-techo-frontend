import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  public menuItems: MenuItem[] = [];

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  public user = computed(() => this.authService.currentUser());

  get isUserAuthenticated() {
    return this.authService.isUserAuthenticated;
  }

  ngOnInit() {
    this.updateMenuItems();
  }

  updateMenuItems() {
    const isMenuVisible = this.isUserAuthenticated || !environment.production;
    this.menuItems = [
      this.generateMenuItem('Inicio', 'pi pi-home', '/dashboard/home'),
      this.generateMenuItem('Telemetría', 'pi pi-gauge', '/dashboard/gauge'),
      this.generateMenuItem('Gráficos', 'pi pi-chart-line', '/dashboard/charts'),
      this.generateMenuItem('Alertas', 'pi pi-bell', '/dashboard/alerts'),
      this.generateMenuItem('Usuarios', 'pi pi-users', '/dashboard/users', isMenuVisible),
      this.generateMenuItem('Parametrización', 'pi pi-cog', '/dashboard/parameterization', isMenuVisible),
    ];
  }

  generateMenuItem(label: string, icon: string, routerLink: string, visible = true) {
    return { label, icon, routerLink, routerLinkActiveOptions: { exact: true }, visible };
  }

  onLogin() {
    this.router.navigateByUrl('/auth/login');
  }

  onLogout() {
    this.authService.logout();
    this.updateMenuItems();
    this.router.navigateByUrl('/dashboard');
  }
}
