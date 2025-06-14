import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormUtils } from '../../../utils/form-utils';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  private readonly fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array(
      [
        ['Metal Gear', [Validators.required, Validators.minLength(3)]],
        ['Death Stranding', [Validators.required, Validators.minLength(3)]],
      ],
      [Validators.minLength(3), Validators.required]
    ),
  });

  get favoriteGames(): FormArray {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  newFavorite = new FormControl('', Validators.required);

  submit() {
    this.myForm.markAllAsTouched();
  }

  addToFavorites(): void {
    if (this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;
    this.favoriteGames.push(
      this.fb.control(newGame, [Validators.required, Validators.minLength(3)])
    );
    this.newFavorite.reset();
    this.favoriteGames.markAsTouched();
  }

  removeFromFavorites(index: number): void {
    this.favoriteGames.removeAt(index);
    this.favoriteGames.markAsTouched();
  }
}
