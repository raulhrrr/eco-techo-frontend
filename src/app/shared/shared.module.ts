import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';

import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { BasicDateFormComponent } from './components/basic-date-form/basic-date-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MenuComponent, FooterComponent, BasicDateFormComponent],
  imports: [CommonModule, ReactiveFormsModule, PrimeNgModule, FormsModule],
  exports: [MenuComponent, FooterComponent, BasicDateFormComponent],
})
export class SharedModule { }
