import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Alert, groupBy, SensorTelemetryData, TelemetryDataFiltered, TelemetryParameterization, TelemetryResponse } from '../interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TelemetryService {
  private socket!: Socket;
  private readonly http = inject(HttpClient);

  initializeSocket() {
    if (this.socket) return;
    this.socket = io(environment.socketUrl, {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    this.socket.on('connect', () => {
      console.log('Conectado al servidor de telemetría');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Error de conexión:', error);
    });
  }

  connect() {
    this.initializeSocket();
    if (!this.socket?.connected) {
      this.socket.connect();
    }
  }

  disconnect() {
    if (this.socket?.connected) {
      this.socket.disconnect();
    }
  }

  onTelemetryData(): Observable<SensorTelemetryData> {
    return new Observable(observer => {
      this.socket.on('telemetryData', data => {
        observer.next(data);
      });

      this.socket.on('disconnect', () => {
        observer.error('Desconectado del servidor de telemetría');
      });

      this.socket.on('reconnect', (attemptNumber) => {
        console.log(`Reconectado al servidor de telemetría después de ${attemptNumber} intentos`);
      });

      this.socket.on('reconnect_error', (error) => {
        observer.error(`Error al intentar reconectar al servidor de telemetría ${error}`);
      });
    });
  }

  getTelemetryParameterization(): Observable<TelemetryParameterization[]> {
    const url = `${environment.baseUrl}/api/telemetry/parameterization`;
    return this.http.get<TelemetryParameterization[]>(url);
  }

  getFilteredTelemetryData(initDate: string, endDate: string, groupBy: groupBy): Observable<TelemetryDataFiltered[]> {
    const url = `${environment.baseUrl}/api/telemetry/filtered-data`;
    return this.http.get<TelemetryDataFiltered[]>(url, {
      params: { initDate, endDate, groupBy }
    });
  }

  updateTelemetryParameterization(id: string, label: string, minValue: number, maxValue: number, lowerThreshold: number, upperThreshold: number, isAlertEnabled: boolean): Observable<TelemetryResponse> {
    const url = `${environment.baseUrl}/api/telemetry/parameterization`;
    return this.http.patch<TelemetryResponse>(url, { id, label, minValue, maxValue, lowerThreshold, upperThreshold, isAlertEnabled });
  }

  getAlerts(initDate: string, endDate: string): Observable<Alert[]> {
    const url = `${environment.baseUrl}/api/telemetry/alerts`;
    return this.http.get<Alert[]>(url, {
      params: { initDate, endDate }
    });
  }
}
