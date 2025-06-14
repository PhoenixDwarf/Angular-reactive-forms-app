import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export class FormUtils {
  //TODO Expresiones regulares

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    const field = form.controls[fieldName];
    if (!field) return null;
    return this.getErrorMessage(field);
  }

  static getFieldErrorInArray(
    formArray: FormArray,
    index: number
  ): string | null {
    const field = formArray.controls[index];
    if (!field) return null;
    return this.getErrorMessage(field);
  }

  private static getErrorMessage(field: AbstractControl): string | null {
    const errors = field.errors ?? {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `El campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `El valor mínimo es ${errors['min'].min}`;
        case 'email':
          return 'El correo electrónico no es válido';
      }
    }
    return null;
  }
}
