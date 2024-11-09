import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TelemetryService } from '../../services/telemetry.service';
import { TelemetryParameterization } from '../../interfaces';
import Swal from 'sweetalert2';
import { minValueLessThanMaxValueValidator, thresholdBetweenMinMaxValidator } from '../../validators/telemetry-validators';

@Component({
  selector: 'app-parameterization',
  templateUrl: './parameterization.component.html',
  styles: ``
})
export class ParameterizationComponent {
  fb = inject(FormBuilder);
  telemetryService = inject(TelemetryService);
  parameters: any[] = [];

  ngOnInit() {
    this.initParameterization();
  }

  initParameterization() {
    this.telemetryService.getTelemetryParameterization().subscribe({
      next: (parameterization) => {
        parameterization.sort((firstParam, secondParam) => {
          if (firstParam.label < secondParam.label) return -1;
          if (firstParam.label > secondParam.label) return 1;
          return 0;
        });
        parameterization.forEach(param => this.parameters.push(this.createParameterForm(param)));
      }
    });
  }

  createParameterForm({ id, label, minValue, maxValue, lowerThreshold, upperThreshold, isAlertEnabled }: TelemetryParameterization) {
    return {
      form: this.fb.group({
        id: [id],
        label: [{ value: label, disabled: true }],
        minValue: [minValue, [Validators.required]],
        maxValue: [maxValue, [Validators.required]],
        lowerThreshold: [lowerThreshold, [Validators.required]],
        upperThreshold: [upperThreshold, [Validators.required]],
        isAlertEnabled: [isAlertEnabled, [Validators.required]],
      }, {
        validators: [minValueLessThanMaxValueValidator(), thresholdBetweenMinMaxValidator()]
      }),
      label
    };
  }

  onParameterSubmit(parameter: any) {
    if (parameter.form.valid) {
      const { id, minValue, maxValue, lowerThreshold, upperThreshold, isAlertEnabled } = parameter.form.value;
      this.telemetryService.updateTelemetryParameterization(id, parameter.label, minValue, maxValue, lowerThreshold, upperThreshold, isAlertEnabled).subscribe({
        next: ({ message }) => { Swal.fire('Éxito', message, 'success'); },
        error: ({ message }) => { Swal.fire('Error', message, 'error'); }
      });
    }
  }
}
