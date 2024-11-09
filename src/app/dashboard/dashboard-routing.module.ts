import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GaugeComponent } from './pages/gauge/gauge.component';
import { ChartsComponent } from './pages/charts/charts.component';
import { ParameterizationComponent } from './pages/parameterization/parameterization.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { isAuthenticatedGuard } from '../auth/guards';
import { AlertsComponent } from './pages/alerts/alerts.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, },
      { path: 'gauge', component: GaugeComponent, },
      { path: 'charts', component: ChartsComponent, },
      { path: 'alerts', component: AlertsComponent, },
      { path: 'users', canActivate: [isAuthenticatedGuard], component: UsersComponent, },
      { path: 'parameterization', canActivate: [isAuthenticatedGuard], component: ParameterizationComponent, },
      { path: '**', redirectTo: 'home', },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
