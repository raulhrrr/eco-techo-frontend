import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { GasResistanceComponent } from './pages/gas-resistance/gas-resistance.component';
import { HumidityComponent } from './pages/humidity/humidity.component';
import { PressureComponent } from './pages/pressure/pressure.component';
import { TemperatureComponent } from './pages/temperature/temperature.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';

@NgModule({
  declarations: [TemperatureComponent, HumidityComponent, PressureComponent, GasResistanceComponent],
  imports: [CommonModule, PrimeNgModule, ChartsRoutingModule],
})
export class ChartsModule {}
