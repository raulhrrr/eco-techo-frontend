import { NgModule } from '@angular/core';

import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { ToolbarModule } from 'primeng/toolbar';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  exports: [CardModule, MenuModule, MenubarModule, PanelModule, ChartModule, ToolbarModule, CarouselModule],
})
export class PrimeNgModule {}
