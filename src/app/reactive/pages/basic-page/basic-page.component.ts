import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {
  // myForm = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  private readonly fb = inject(FormBuilder);

  myForm: FormGroup = this.fb.group({
    name: [
      '',
      /** Validadores sincronicos */ [
        Validators.required,
        Validators.minLength(3),
      ],
      /** Validadores asincrónicos */ [],
    ],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  //This wont work in zoneless applications
  isValidField(fieldName: string): boolean | null {
    console.log('executed');
    return !!this.myForm.controls[fieldName].errors;
  }

  //This wont work in zoneless applications
  getFieldError(fieldName: string): string | null {
    const field = this.myForm.controls[fieldName];

    if (!field) return null;

    const errors = field.errors ?? {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `El campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `El valor mínimo es ${errors['min'].min}`;
      }
    }
    return null;
  }
}
