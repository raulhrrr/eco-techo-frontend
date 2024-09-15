import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarChartComponent } from './pages/bar-chart/bar-chart.component';
import { PieChartComponent } from './pages/pie-chart/pie-chart.component';
import { LineChartComponent } from './pages/line-chart/line-chart.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'bar-chart',
        component: BarChartComponent,
      },
      {
        path: 'pie-chart',
        component: PieChartComponent,
      },
      {
        path: 'line-chart',
        component: LineChartComponent,
      },
      {
        path: '**',
        redirectTo: 'bar-chart',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
