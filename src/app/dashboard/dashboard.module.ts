import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxGaugeModule } from 'ngx-gauge';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { GaugeComponent } from './pages/gauge/gauge.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ChartsComponent } from './pages/charts/charts.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    GaugeComponent,
    ChartsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNgModule,
    NgxGaugeModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
