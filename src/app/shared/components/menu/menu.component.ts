import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent {

  public menuItems: MenuItem[] = [];

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Gráficos',
        icon: 'pi pi-bars',
        items: [
          {
            label: 'Barras',
            icon: 'pi pi-chart-bar',
            routerLink: 'charts/bar-chart'
          },
          {
            label: 'Circular',
            icon: 'pi pi-chart-pie',
            routerLink: 'charts/pie-chart'
          },
          {
            label: 'Líneas',
            icon: 'pi pi-chart-line',
            routerLink: 'charts/line-chart'
          },
        ]
      }
    ];
  }
}
