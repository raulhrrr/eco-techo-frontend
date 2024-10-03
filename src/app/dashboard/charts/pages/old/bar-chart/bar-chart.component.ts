import { Component } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent {
  basicData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Data 1',
        backgroundColor: '#42A5F5',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: 'Data 2',
        backgroundColor: '#9CCC65',
        data: [28, 48, 40, 19, 86, 27, 90],
      },
    ],
  };

  basicOptions = {
    title: {
      display: true,
      text: 'Custom Title',
      fontSize: 16,
    },
    legend: {
      position: 'bottom',
    },
  };
}
