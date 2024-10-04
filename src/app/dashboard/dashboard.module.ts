import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxGaugeModule } from 'ngx-gauge';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { GaugeComponent } from './pages/gauge/gauge.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';


@NgModule({
  declarations: [
    HomeComponent,
    GaugeComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    NgxGaugeModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
