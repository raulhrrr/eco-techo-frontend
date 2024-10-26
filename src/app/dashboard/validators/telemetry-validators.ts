import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minValueLessThanMaxValueValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const minValue = control.get('minValue')?.value;
    const maxValue = control.get('maxValue')?.value;

    return minValue !== null && maxValue !== null && minValue >= maxValue ? { minValueLessThanMaxValue: true } : null;
  };
}

export function thresholdBetweenMinMaxValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const minValue = control.get('minValue')?.value;
    const maxValue = control.get('maxValue')?.value;
    const lowerThreshold = control.get('lowerThreshold')?.value;
    const upperThreshold = control.get('upperThreshold')?.value;

    const lowerThresholdValid = lowerThreshold !== null && minValue !== null && maxValue !== null && lowerThreshold >= minValue && lowerThreshold <= maxValue;
    const upperThresholdValid = upperThreshold !== null && minValue !== null && maxValue !== null && upperThreshold >= minValue && upperThreshold <= maxValue;

    return !lowerThresholdValid || !upperThresholdValid ? { thresholdBetweenMinMax: true } : null;
  };
}
