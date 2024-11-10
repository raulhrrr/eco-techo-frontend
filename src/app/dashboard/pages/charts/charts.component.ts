import { Component, HostListener, inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { getFormattedDate, getDayOrHourFromDate } from 'src/app/utils/date-utils';
import { TelemetryService } from '../../services/telemetry.service';
import { ChartType, groupBy, TelemetryDataFiltered } from '../../interfaces';
import { ChartData, ChartOptions } from 'chart.js';
import { UIChart } from 'primeng/chart';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styles: ``
})
export class ChartsComponent {
  @ViewChild('chart') chartComponent!: UIChart;
  telemetryService = inject(TelemetryService);
  currentDate!: string;
  chartTypes: ChartType[] = [
    { label: 'Líneas', value: 'line' },
    { label: 'Barras', value: 'bar' },
    // { label: 'Circular', value: 'pie' },
    // { label: 'Dona', value: 'doughnut' },
    // { label: 'Polar', value: 'polarArea' },
    // { label: 'Radar', value: 'radar' }
  ];
  selectedChartType: string = 'line';

  chartData!: ChartData;
  chartOptions!: ChartOptions;

  ngOnInit() {
    this.initializeCharOptions();
    this.initializeChartData();
  }

  private initializeCharOptions() {
    const selected = this.chartTypes.find(c => c.value === this.selectedChartType);
    const text = `Diagrama de ${selected?.label}`;
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text
        }
      }
    };
  }

  private initializeChartData() {
    this.currentDate = getFormattedDate();
    this.telemetryService.getFilteredTelemetryData(this.currentDate, this.currentDate, 'hour').subscribe({
      next: data => {
        this.populateChartData(data, 'hour');
      },
      error: () => {
        const data: TelemetryDataFiltered[] = [{
          groupedDate: `${this.currentDate} 00:00:00`,
          avg_temperature: 0,
          avg_humidity: 0,
          avg_pressure: 0,
          avg_gas_resistance: 0
        }];
        this.populateChartData(data, 'hour');
      }
    });

  }

  private populateChartData(data: TelemetryDataFiltered[], groupBy: groupBy) {
    const fill = false;
    const tension = 0.4;
    this.chartData = {
      labels: data.map(d => getDayOrHourFromDate(d.groupedDate, groupBy)),
      datasets: [
        this.generateDataset('Promedio temperatura', data.map(d => d.avg_temperature), fill, '#42A5F5', tension),
        this.generateDataset('Promedio humedad', data.map(d => d.avg_humidity), fill, '#FFA726', tension),
        this.generateDataset('Promedio presión', data.map(d => d.avg_pressure), fill, '#66BB6A', tension),
        this.generateDataset('Promedio resistencia al gas', data.map(d => d.avg_gas_resistance), fill, '#EF5350', tension)
      ]
    };
    this.chartComponent.refresh();
  }

  generateDataset(label: string, data: number[], fill: boolean, color: string, tension: number) {
    return { label, data, fill, borderColor: color, backgroundColor: color, tension };
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      let { initDate, endDate } = form.value;
      initDate = getFormattedDate(initDate);
      endDate = getFormattedDate(endDate);

      const groupBy = initDate === endDate ? 'hour' : 'day';
      this.telemetryService.getFilteredTelemetryData(initDate, endDate, groupBy).subscribe(data => {
        this.populateChartData(data, groupBy);
      });
    }
  }

  resetChart() {
    setTimeout(() => {
      this.chartComponent.reinit();
    }, 0);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.chartComponent) this.resetChart();
  }

  onChartTypeChange(event: any) {
    this.selectedChartType = event.value;
    this.initializeCharOptions();
    this.resetChart();
  }
}
