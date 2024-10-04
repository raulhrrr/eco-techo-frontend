import { Component } from '@angular/core';

type MarkerType = 'line' | 'triangle';

interface Marker {
  color?: string;
  type?: MarkerType;
  size?: number;
  label?: number | string;
  font?: string;
}

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styles: ``
})
export class GaugeComponent {
  temperature = 22.60;
  humidity = 61.47;
  pressure = 753.47;
  gasResistance = 64.76;

  getValues(min: number, max: number) {
    const range = Math.abs(min) + max;
    const firstTertiere = range / 3;
    const secondTertiere = firstTertiere * 2;

    return {
      [min]: 'green',
      [firstTertiere]: 'yellow',
      [secondTertiere]: 'red'
    };
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

    const markers: { [key: string]: Marker } = {};
    const division = range / (range % 2 === 0 ? 10 : 11)

    let value = min;
    while (value <= range) {
      markers[value.toString()] = { color: '#555', label: value.toString(), font: '12px arial' };
      if (value < (range + min)) markers[(value + division / 2).toString()] = { color: '#555' };
      value += division;
    }

    return markers;
  }

  gauges = [
    { label: 'Temperatura', value: this.temperature, min: -5, max: 50, append: '°C', thresholds: this.generateThresholds(-5, 50), markers: this.generateMarkers(-5, 50) },
    { label: 'Humedad', value: this.humidity, min: 0, max: 100, append: '%', thresholds: this.generateThresholds(0, 100), markers: this.generateMarkers(0, 100) },
    { label: 'Presión', value: this.pressure, min: 0, max: 1000, append: 'hPa', thresholds: this.generateThresholds(0, 1000), markers: this.generateMarkers(0, 1000) },
    { label: 'Resistencia al gas', value: this.gasResistance, min: 0, max: 100, append: 'kΩ', thresholds: this.generateThresholds(0, 100), markers: this.generateMarkers(0, 100) },
  ];
}
