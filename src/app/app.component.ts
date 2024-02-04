import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import moment from 'moment';
import 'moment/locale/pt-br'

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class AppComponent {
  headerImage = '../assets/header.jpg';
  forms = new FormGroup({
    name: new FormControl<string | null>('', [Validators.required]),
    age: new FormControl<number | null>(null, [Validators.required]),
    date: new FormControl<Date | null>(null, [Validators.required]),
    hour: new FormControl<number | null>(null, [Validators.required]),
    trainingStory: new FormControl<string | null>('', [Validators.required])
  });

  horas_disponiveis = [] as number[]
  myFilter = (d: Date | null): boolean => {
    if (this.forms.controls.age.value) {
      if (this.forms.controls.age.value <= 12) {
        return moment(d).day() === 1 || moment(d).day() === 3;
      }

      return moment(d).day() !== 0;
    }
    return false;
  }

  changeDateInput($event: MatDatepickerInputEvent<Date, Date | null>) {
    const date: Date | null = $event.value;
    if (!this.forms.controls.age.value ) {
      this.horas_disponiveis = [];
      return
    }
    if (this.forms.controls.age.value <= 12) {
      this.horas_disponiveis = [19]
      return;
    }
    if ( moment(date).day()  !== 0 ) {
      console.log(`DAY ${moment(date).day()}`)
      if ( moment(date).day() !== 6) {
        this.horas_disponiveis = [18, 20]
      } else {
        this.horas_disponiveis = [9]
      }
    }
    console.log(this.horas_disponiveis)
  }

  changeAge(event: string | null) {
    this.forms.controls.date.setValue(null)
    this.forms.controls.hour.setValue(null)

    console.log(event)
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  formatMessage (value: Partial<{ name: string | null; age: number | null; date: Date | null; hour: number | null; trainingStory: string | null; }>) {
    const {age, date, hour, name, trainingStory} = value;
    const formatedDate = moment(date).locale('pt-br').format('LL');
    const formattedName = name ?? ''
    return `Olá tudo bem Lourival, Sou ${this.capitalizeFirstLetter(formattedName)} tenho ${age} e ${trainingStory}. Quero marcar meu treino dia ${formatedDate} no treino das ${hour} horas`
  }
  submitForms() {
    console.log(this.forms.valid)
    if (!this.forms.valid) {
      return
    }
    const message = this.formatMessage(this.forms.value)
    const phoneNumber = '553187954898'
    const url = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(url, '_blank');
    console.log(this.forms.value)
  }
}
