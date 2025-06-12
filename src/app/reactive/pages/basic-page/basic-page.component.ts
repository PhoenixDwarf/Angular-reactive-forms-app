import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
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

  myForm = this.fb.group({
    name: [
      '',
      /** Validadores sincronicos */ [],
      /** Validadores asincrónicos */ [],
    ],
    price: [0],
    inStorage: [0],
  });
}
