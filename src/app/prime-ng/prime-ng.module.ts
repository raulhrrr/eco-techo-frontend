import { NgModule } from '@angular/core';

import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';

@NgModule({
  exports: [
    PanelModule,
    CardModule,
    ChartModule,
    MenubarModule,
  ]
})
export class PrimeNgModule { }
