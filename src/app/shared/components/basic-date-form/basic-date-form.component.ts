import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { getFormattedDate } from 'src/app/utils/date-utils';

@Component({
  selector: 'shared-basic-date-form',
  templateUrl: './basic-date-form.component.html',
  styles: ``
})
export class BasicDateFormComponent implements OnInit {
  currentDate!: string;
  fb = inject(FormBuilder);
  form: FormGroup = this.fb.group({
    initDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]]
  }, {
    validators: this.dateValidator
  });

  dateValidator(form: AbstractControl): ValidationErrors | null {
    const initDate = form.get('initDate')?.value;
    const endDate = form.get('endDate')?.value;

    if (initDate > endDate) {
      return { dateError: true }
    }
    return null;
  }

  @Output() onFormSubmit = new EventEmitter<FormGroup>();

  ngOnInit() {
    this.initializeFormData();
  }

  private initializeFormData() {
    this.currentDate = getFormattedDate();
    this.form.patchValue({ initDate: this.currentDate, endDate: this.currentDate });
  }

  onSubmit() {
    this.onFormSubmit.emit(this.form);
  }
}
