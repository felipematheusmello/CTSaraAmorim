import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import * as moment from 'moment';

@Component({
  selector: 'app-custom-forms',
  standalone: true,
  templateUrl: './custom-forms.component.html',
  styleUrl: './custom-forms.component.scss',
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule],
})
export class CustomFormsComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
  });


  myFilter = (d: Date | null): boolean => {


    return moment(d).day() !== 0;
  }
}
