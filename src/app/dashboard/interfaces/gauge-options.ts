type MarkerType = 'line' | 'triangle';

export interface Marker {
  color?: string;
  type?: MarkerType;
  size?: number;
  label?: number | string;
  font?: string;
}

export interface GaugeOptions {
  label: string;
  value: number;
  min: number;
  max: number;
  append: string;
  thresholds: { [key: string]: { color: string } };
  markers: { [key: string]: Marker };
  lowerThreshold: number;
  upperThreshold: number;
}
