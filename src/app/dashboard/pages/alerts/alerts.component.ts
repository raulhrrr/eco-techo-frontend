import { Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { getFormattedDate } from 'src/app/utils/date-utils';
import { TelemetryService } from '../../services/telemetry.service';
import { Alert } from '../../interfaces';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styles: ``
})
export class AlertsComponent implements OnInit {
  telemetryService = inject(TelemetryService);
  currentDate!: string;
  alerts: Alert[] = [];

  ngOnInit() {
    this.currentDate = getFormattedDate();
    this.getAlerts(this.currentDate, this.currentDate);
  }

  onExport() {
    if (!this.alerts.length) return;

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.alerts.map(alert => ({
      'Fecha de generación': new Date(alert.timestamp).toLocaleString(),
      'Mensaje': alert.message,
      'Valor': alert.telemetryData.value,
      'Etiqueta': alert.telemetryData.telemetryParameterization.label,
      'Unidad de medida': alert.telemetryData.telemetryParameterization.append,
      'Valor mínimo': alert.telemetryData.telemetryParameterization.minValue,
      'Valor máximo': alert.telemetryData.telemetryParameterization.maxValue,
      'Umbral inferior': alert.telemetryData.telemetryParameterization.lowerThreshold,
      'Umbral superior': alert.telemetryData.telemetryParameterization.upperThreshold
    })));

    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Alertas');

    XLSX.writeFile(workbook, `alertas_${new Date().getTime()}.xlsx`);
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      let { initDate, endDate } = form.value;
      initDate = getFormattedDate(initDate);
      endDate = getFormattedDate(endDate);

      this.getAlerts(initDate, endDate);
    }
  }

  private getAlerts(initDate: string, endDate: string) {
    this.telemetryService.getAlerts(initDate, endDate).subscribe({
      next: data => {
        this.alerts = data;
        console.log(this.alerts)
      },
      error: () => {
        this.alerts = [];
      }
    });
  }
}
