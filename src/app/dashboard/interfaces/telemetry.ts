export type groupBy = 'day' | 'hour';

export interface SensorTelemetryData {
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

export interface Alert {
  id: string;
  message: string;
  telemetryDataId: string;
  timestamp: Date;
  telemetryData: TelemetryData;
}

export interface TelemetryData {
  id: string;
  telemetryParamId: string;
  value: number;
  timestamp: Date;
  telemetryParameterization: TelemetryParameterization;
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
  isAlertEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TelemetryResponse {
  statusCode: number;
  message: string;
}
