import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemperatureComponent } from './pages/temperature/temperature.component';
import { HumidityComponent } from './pages/humidity/humidity.component';
import { PressureComponent } from './pages/pressure/pressure.component';
import { GasResistanceComponent } from './pages/gas-resistance/gas-resistance.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'temperature',
        component: TemperatureComponent,
      },
      {
        path: 'humidity',
        component: HumidityComponent,
      },
      {
        path: 'pressure',
        component: PressureComponent,
      },
      {
        path: 'gas-resistance',
        component: GasResistanceComponent,
      },
      {
        path: '**',
        redirectTo: 'temperature',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule {}
