import { Component, inject } from '@angular/core';
import { TelemetryService } from '../../services/telemetry.service';
import { GaugeOptions, Marker, TelemetryParameterization } from '../../interfaces';
import { Subscription } from 'rxjs';
import { MEASUREMENT_VARIABLES } from 'src/app/constants/measurement-variables';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styles: `
    .led {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }

    .led-red {
      background-color: #cb3234;
    }

    .led-green {
      background-color: #008f39;
    }
  `
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

  private updateGaugeValue(label: string, value: number) {
    const gauge = this.gauges.find(gauge => gauge.label === label);
    if (gauge) gauge.value = Number(value.toFixed(2));
  }

  initGaugeOptions() {
    this.telemetryService.getTelemetryParameterization().subscribe({
      next: (parameterization) => {
        if (this.gauges.length) {
          this.updateGaugeParameterization(parameterization);
          return;
        };

        parameterization.forEach(({ label, initialValue, append, minValue, maxValue, lowerThreshold, upperThreshold, isAlertEnabled }) =>
          this.gauges.push(this.generateGaugeOptions(label, initialValue, append, minValue, maxValue, lowerThreshold, upperThreshold, isAlertEnabled))
        );
        this.setGaugesToLocalStorage();
      },
      complete: () => {
        this.gauges.sort((firstGauge, secondGauge) => {
          if (firstGauge.label < secondGauge.label) return -1;
          if (firstGauge.label > secondGauge.label) return 1;
          return 0;
        });
      },
      error: () => {
        this.gauges = [
          this.generateGaugeOptions(MEASUREMENT_VARIABLES.TEMPERATURE, 0, '°C', 0, 50, 0, 50, false),
          this.generateGaugeOptions(MEASUREMENT_VARIABLES.HUMIDITY, 0, '%', 0, 100, 0, 100, false),
          this.generateGaugeOptions(MEASUREMENT_VARIABLES.PRESSURE, 0, 'hPa', 0, 1000, 0, 1000, false),
          this.generateGaugeOptions(MEASUREMENT_VARIABLES.GAS_RESISTANCE, 0, 'KΩ', 0, 100, 0, 100, false),
        ];
        this.setGaugesToLocalStorage();
      }
    });
  }

  updateGaugeParameterization(parameterization: TelemetryParameterization[]) {
    this.gauges.forEach(gauge => {
      const parameter = parameterization.find(param => param.label === gauge.label);
      if (parameter) {
        const { minValue, maxValue, lowerThreshold, upperThreshold, isAlertEnabled } = parameter;
        gauge.min = minValue;
        gauge.max = maxValue;
        gauge.lowerThreshold = lowerThreshold;
        gauge.upperThreshold = upperThreshold;
        gauge.thresholds = this.generateThresholds(minValue, maxValue);
        gauge.markers = this.generateMarkers(minValue, maxValue);
        gauge.isAlertEnabled = isAlertEnabled;
      }
    });
    this.setGaugesToLocalStorage();
  }

  setGaugesToLocalStorage() {
    localStorage.setItem('gauges', JSON.stringify(this.gauges));
  }

  loadGauges() {
    const storedGauges = localStorage.getItem('gauges');
    this.gauges = storedGauges ? JSON.parse(storedGauges) : this.gauges;
  }

  generateGaugeOptions(label: string, value: number, append: string, min: number, max: number, lowerThreshold: number, upperThreshold: number, isAlertEnabled: boolean) {
    return {
      label, value: Number(value.toFixed(2)), min, max, append, thresholds: this.generateThresholds(min, max), markers: this.generateMarkers(min, max), lowerThreshold, upperThreshold, isAlertEnabled
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
