import { NgModule } from '@angular/core';

import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { ToolbarModule } from 'primeng/toolbar';
import { CarouselModule } from 'primeng/carousel';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  exports: [
    CardModule,
    MenuModule,
    MenubarModule,
    PanelModule,
    ChartModule,
    ToolbarModule,
    CarouselModule,
    SidebarModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
  ],
})
export class PrimeNgModule { }
