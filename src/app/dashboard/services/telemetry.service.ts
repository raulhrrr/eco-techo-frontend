import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environments';
import { TelemetricDataModel } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TelemetryService {
  private readonly socket: Socket;

  constructor() {
    this.socket = io(environment.socketUrl, {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    this.socket.on('connect', () => {
      console.log('Conectado al servidor de telemetría');
    });

    this.socket.on('disconnect', (reason) => {
      console.log(`Desconectado del servidor de telemetría: ${reason}`);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Error de conexión:', error);
    });
  }

  private getRandomNumber(min: number, max: number) {
    return Number((Math.random() * (max - min) + min).toFixed(2));
  };

  getMockTelemetricData() {
    return of({
      temperature: this.getRandomNumber(-5, 50),
      humidity: this.getRandomNumber(0, 100),
      pressure: this.getRandomNumber(0, 1000),
      gas_resistance: this.getRandomNumber(0, 100),
    });
  }

  onTelemetricData(): Observable<TelemetricDataModel> {
    return new Observable(observer => {
      this.socket.on('telemetricData', data => {
        observer.next(data);
      });

      // Maneja la desconexión y reconexión
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
}
