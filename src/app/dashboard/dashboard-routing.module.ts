import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GaugeComponent } from './pages/gauge/gauge.component';
import { ChartsComponent } from './pages/charts/charts.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'gauge',
        component: GaugeComponent,
      },
      {
        path: 'charts',
        component: ChartsComponent,
      },
      {
        path: '**',
        redirectTo: 'charts',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
