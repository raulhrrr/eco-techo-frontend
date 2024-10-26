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
        parameterization.forEach(param => {
          this.parameters.push(this.createParameterForm(param));
        });
      }
    });
  }

  createParameterForm({ id, label, minValue, maxValue, lowerThreshold, upperThreshold }: TelemetryParameterization) {
    return {
      form: this.fb.group({
        id: [id],
        label: [{ value: label, disabled: true }],
        minValue: [minValue, [Validators.required]],
        maxValue: [maxValue, [Validators.required]],
        lowerThreshold: [lowerThreshold, [Validators.required]],
        upperThreshold: [upperThreshold, [Validators.required]]
      }, {
        validators: [minValueLessThanMaxValueValidator(), thresholdBetweenMinMaxValidator()]
      }),
      label
    };
  }

  onParameterSubmit(parameter: any) {
    if (parameter.form.valid) {
      const { id, minValue, maxValue, lowerThreshold, upperThreshold } = parameter.form.value;
      this.telemetryService.updateTelemetryParameterization(id, parameter.label, minValue, maxValue, lowerThreshold, upperThreshold).subscribe({
        next: response => Swal.fire('Éxito', response.message, 'success'),
        error: () => Swal.fire('Error', 'Ocurrió un error al actualizar el parámetro', 'error')
      });
    }
  }
}