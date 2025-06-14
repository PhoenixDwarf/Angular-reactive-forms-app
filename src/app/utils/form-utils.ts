import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export class FormUtils {
  static readonly namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static readonly emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static readonly notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

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
        case 'pattern':
          if (
            errors['pattern'].requiredPattern.includes(FormUtils.namePattern)
          ) {
            return 'El formato debe ser "Nombre Apellido"';
          }
          if (
            errors['pattern'].requiredPattern.includes(FormUtils.emailPattern)
          ) {
            return 'El formato del correo electrónico no es válido';
          }
          if (
            errors['pattern'].requiredPattern.includes(
              FormUtils.notOnlySpacesPattern
            )
          ) {
            return 'El campo no puede contener solo espacios';
          }
          return 'El formato del campo no es válido';
        default:
          return `Error desconocido: ${key}`;
      }
    }
    return null;
  }
}
