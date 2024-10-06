import { Component, inject } from '@angular/core';
import { TelemetryService } from '../../services/telemetry.service';
import { GaugeOptions, Marker } from '../../interfaces';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styles: ``
})
export class GaugeComponent {
  telemetryService = inject(TelemetryService);

  gauges: GaugeOptions[] = [
    this.generateGaugeOptions('Temperatura', 0, '°C', -5, 50),
    this.generateGaugeOptions('Humedad', 0, '%', 0, 100),
    this.generateGaugeOptions('Presión', 0, 'hPa', 0, 1000),
    this.generateGaugeOptions('Resistencia al gas', 0, 'kΩ', 0, 100)
  ];

  ngOnInit() {
    this.initTelemetryService();
  }

  initTelemetryService() {
    this.telemetryService.onTelemetricData().subscribe({
      next: ({ temperature, humidity, pressure, gas_resistance }) => {
        this.gauges[0].value = temperature;
        this.gauges[1].value = humidity;
        this.gauges[2].value = pressure;
        this.gauges[3].value = gas_resistance;
      },
      error: (error) => {
        console.error('Error de conexión:', error);
      }
    });
  }

  generateGaugeOptions(label: string, value: number, append: string, min: number, max: number) {
    return {
      label, value, min, max, append, thresholds: this.generateThresholds(min, max), markers: this.generateMarkers(min, max)
    }
  }

  generateThresholds(min: number, max: number) {
    const range = Math.abs(min) + max;
    const firstTertiere = range / 3;
    const secondTertiere = firstTertiere * 2;

    return {
      [min]: { color: 'green' },
      [firstTertiere]: { color: 'yellow' },
      [secondTertiere]: { color: 'red' }
    };
  }

  generateMarkers(min: number, max: number) {
    const range = Math.abs(min) + max;

    const color = '#555';
    const markers: { [key: string]: Marker } = {};
    const division = range / (range % 2 === 0 ? 10 : 11)

    let value = min;
    while (value <= range) {
      markers[value.toString()] = { color, size: 10, label: value.toString(), font: '12px arial' };
      if (value < (range + min)) markers[(value + division / 2).toString()] = { color, size: 5 };
      value += division;
    }

    return markers;
  }
}
