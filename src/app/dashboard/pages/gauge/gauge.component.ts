import { Component, inject } from '@angular/core';
import { TelemetryService } from '../../services/telemetry.service';
import { GaugeOptions, Marker } from '../../interfaces';
import { Subscription } from 'rxjs';
import { MEASUREMENT_VARIABLES } from 'src/app/constants/measurement-variables';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styles: ``
})
export class GaugeComponent {
  gauges: GaugeOptions[] = [];
  telemetryService = inject(TelemetryService);
  telemetryServiceSubscription!: Subscription;

  ngOnInit() {
    this.loadGauges();
    this.initGaugeOptions();
    this.initTelemetryService();
  }

  initTelemetryService() {
    this.telemetryService.connect();
    this.telemetryServiceSubscription = this.telemetryService.onTelemetryData().subscribe({
      next: ({ temperature, humidity, pressure, gas_resistance }) => {
        if (!this.gauges.length) return;

        this.updateGaugeValue(MEASUREMENT_VARIABLES.TEMPERATURE, temperature);
        this.updateGaugeValue(MEASUREMENT_VARIABLES.HUMIDITY, humidity);
        this.updateGaugeValue(MEASUREMENT_VARIABLES.PRESSURE, pressure);
        this.updateGaugeValue(MEASUREMENT_VARIABLES.GAS_RESISTANCE, gas_resistance);

        this.setGaugesToLocalStorage();
      }
    });
  }

  private updateGaugeValue(label: string, temperature: number) {
    const gauge = this.gauges.find(gauge => gauge.label === label);
    if (gauge) gauge.value = temperature
  }

  initGaugeOptions() {
    if (this.gauges.length) return;
    this.telemetryService.getTelemetryParameterization().subscribe({
      next: (parameterization) => {
        parameterization.forEach(({ label, initialValue, append, minValue, maxValue, lowerThreshold, upperThreshold }) => {
          this.gauges.push(this.generateGaugeOptions(label, initialValue, append, minValue, maxValue, lowerThreshold, upperThreshold));
        });

        this.setGaugesToLocalStorage();
      },
      error: () => {
        this.gauges = [
          this.generateGaugeOptions(MEASUREMENT_VARIABLES.TEMPERATURE, 0, '°C', 0, 50, 0, 0),
          this.generateGaugeOptions(MEASUREMENT_VARIABLES.HUMIDITY, 0, '%', 0, 100, 0, 0),
          this.generateGaugeOptions(MEASUREMENT_VARIABLES.PRESSURE, 0, 'hPa', 0, 1000, 0, 0),
          this.generateGaugeOptions(MEASUREMENT_VARIABLES.GAS_RESISTANCE, 0, 'KΩ', 0, 100, 0, 0),
        ]

        this.setGaugesToLocalStorage();
      }
    });
  }

  setGaugesToLocalStorage() {
    localStorage.setItem('gauges', JSON.stringify(this.gauges));
  }

  loadGauges() {
    const storedGauges = localStorage.getItem('gauges');
    this.gauges = storedGauges ? JSON.parse(storedGauges) : this.gauges;
  }

  generateGaugeOptions(label: string, value: number, append: string, min: number, max: number, lowerThreshold: number, upperThreshold: number) {
    return {
      label, value, min, max, append, thresholds: this.generateThresholds(min, max), markers: this.generateMarkers(min, max), lowerThreshold, upperThreshold
    }
  }

  generateThresholds(min: number, max: number) {
    const range = Math.abs(min) + max;
    const firstTertiere = range / 3;
    const secondTertiere = firstTertiere * 2;
    const bgOpacity = 0.2;

    return {
      [min]: { color: '#008f39', bgOpacity },
      [firstTertiere]: { color: '#ffff00', bgOpacity },
      [secondTertiere]: { color: '#cb3234', bgOpacity }
    };
  }

  generateMarkers(min: number, max: number) {
    const range = Math.abs(min) + max;

    const color = '#555';
    const markers: { [key: string]: Marker } = {};
    const division = range / (range % 2 === 0 ? 10 : 11)

    let value = min;
    while (value <= range) {
      markers[value.toString()] = { color, size: 10, label: value.toString(), font: '1rem arial' };
      if (value < (range + min)) markers[(value + division / 2).toString()] = { color, size: 5 };
      value += division;
    }

    return markers;
  }

  ngOnDestroy() {
    this.telemetryService.disconnect();
    this.telemetryServiceSubscription?.unsubscribe();
  }
}
