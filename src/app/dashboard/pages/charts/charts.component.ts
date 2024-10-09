import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { getFormattedDate, getDayOrHourFromDate } from 'src/app/utils/date-utils';
import { TelemetryService } from '../../services/telemetry.service';
import { groupBy, TelemetryDataFiltered } from '../../interfaces';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styles: ``
})
export class ChartsComponent {
  form: FormGroup;
  fb = inject(FormBuilder);
  telemetryService = inject(TelemetryService);
  currentDate!: string;

  chartData!: ChartData;
  chartOptions!: ChartOptions;

  constructor() {
    this.form = this.fb.group({
      initDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.initializeFormData();
    this.initializeChartData();
  }

  private initializeChartData() {
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Diagrama de Líneas'
        }
      }
    };

    this.telemetryService.getFilteredTelemetryData(this.currentDate, this.currentDate, 'hour').subscribe(data => {
      this.populateChartData(data, 'hour');
    });

  }

  private initializeFormData() {
    this.currentDate = getFormattedDate();
    this.form.patchValue({ initDate: this.currentDate, endDate: this.currentDate });
  }

  dateValidator(form: AbstractControl): ValidationErrors | null {
    const initDate = form.get('initDate')?.value;
    const endDate = form.get('endDate')?.value;

    if (initDate > endDate) {
      return { dateError: true }
    }
    return null;
  }

  private populateChartData(data: TelemetryDataFiltered[], groupBy: groupBy) {
    this.chartData = {
      labels: data.map(d => getDayOrHourFromDate(d.groupedDate, groupBy)),
      datasets: [
        {
          label: 'Promedio temperatura',
          data: data.map(d => d.avg_temperature),
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4
        },
        {
          label: 'Promedio humedad',
          data: data.map(d => d.avg_humidity),
          fill: false,
          borderColor: '#FFA726',
          tension: 0.4
        },
        {
          label: 'Promedio presión',
          data: data.map(d => d.avg_pressure),
          fill: false,
          borderColor: '#66BB6A',
          tension: 0.4
        },
        {
          label: 'Promedio resistencia al gas',
          data: data.map(d => d.avg_gas_resistance),
          fill: false,
          borderColor: '#EF5350',
          tension: 0.4
        }
      ]
    };
  }

  onSubmit() {
    if (this.form.valid) {
      let { initDate, endDate } = this.form.value;
      initDate = getFormattedDate(initDate);
      endDate = getFormattedDate(endDate);

      const groupBy = initDate === endDate ? 'hour' : 'day';
      this.telemetryService.getFilteredTelemetryData(initDate, endDate, groupBy).subscribe(data => {
        console.log({ groupBy, data });
        this.populateChartData(data, groupBy);
      });
    }
  }

}
