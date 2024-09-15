import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { BarChartComponent } from './pages/bar-chart/bar-chart.component';
import { LineChartComponent } from './pages/line-chart/line-chart.component';
import { PieChartComponent } from './pages/pie-chart/pie-chart.component';


@NgModule({
  declarations: [
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ChartsRoutingModule
  ]
})
export class ChartsModule { }
