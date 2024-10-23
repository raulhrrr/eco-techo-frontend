export type groupBy = 'day' | 'hour';

export interface TelemetryData {
  temperature: number;
  humidity: number;
  pressure: number;
  gas_resistance: number;
}

export interface TelemetryDataFiltered {
  groupedDate: string;
  avg_temperature: number;
  avg_humidity: number;
  avg_pressure: number;
  avg_gas_resistance: number;
}

export interface TelemetryParameterization {
  id: string;
  label: string;
  initialValue: number;
  append: string;
  minValue: number;
  maxValue: number;
  lowerThreshold: number;
  upperThreshold: number;
}
