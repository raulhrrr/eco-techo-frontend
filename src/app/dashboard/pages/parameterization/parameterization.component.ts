import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TelemetryService } from '../../services/telemetry.service';
import objectHash from 'object-hash';
import { TelemetryParameterization } from '../../interfaces';
import Swal from 'sweetalert2';
import { minValueLessThanMaxValueValidator, thresholdBetweenMinMaxValidator } from '../../validators/telemetry-validators';

interface ParameterForm {
  form: FormGroup;
  label: string;
  measurementUnit: string;
  initialHash: string;
}

@Component({
  selector: 'app-parameterization',
  templateUrl: './parameterization.component.html',
  styles: ``
})
export class ParameterizationComponent {
  fb = inject(FormBuilder);
  telemetryService = inject(TelemetryService);
  parameters: ParameterForm[] = [];

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

  getControlValue(parameter: ParameterForm, controlName: string) {
    return parameter.form.get(controlName)?.value;
  }

  createParameterForm({ id, label, append, minValue, maxValue, lowerThreshold, upperThreshold, isAlertEnabled }: TelemetryParameterization): ParameterForm {
    const form = this.fb.group({
      id: [id],
      label: [{ value: label, disabled: true }],
      minValue: [minValue, [Validators.required]],
      maxValue: [maxValue, [Validators.required]],
      lowerThreshold: [lowerThreshold, [Validators.required]],
      upperThreshold: [upperThreshold, [Validators.required]],
      isAlertEnabled: [isAlertEnabled, [Validators.required]],
    }, {
      validators: [minValueLessThanMaxValueValidator(), thresholdBetweenMinMaxValidator()]
    })

    const initialHash = objectHash(form.getRawValue());
    return { form, label, measurementUnit: ` ${append}`, initialHash };
  }

  hasChanges(parameter: ParameterForm): boolean {
    const currentHash = objectHash(parameter.form.getRawValue());
    return currentHash !== parameter.initialHash;
  }

  onParameterSubmit(parameter: ParameterForm) {
    if (parameter.form.valid) {
      const { id, minValue, maxValue, lowerThreshold, upperThreshold, isAlertEnabled } = parameter.form.value;
      this.telemetryService.updateTelemetryParameterization(id, parameter.label, minValue, maxValue, lowerThreshold, upperThreshold, isAlertEnabled).subscribe({
        next: ({ message }) => { Swal.fire('Éxito', message, 'success'); },
        error: ({ message }) => { Swal.fire('Error', message, 'error'); },
        complete: () => { parameter.initialHash = objectHash(parameter.form.getRawValue()); }
      });
    }
  }
}
