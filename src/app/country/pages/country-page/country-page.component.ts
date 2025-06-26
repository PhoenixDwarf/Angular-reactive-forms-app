import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { Subscription, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  fb = inject(FormBuilder);
  countryService = inject(CountryService);

  regions = signal<string[]>(this.countryService.regions);

  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  onFormChange = effect((onCleanup) => {
    const regionSubscription = this.onRegionChange();
    const countrySubscription = this.onCountryChange();
    onCleanup(() => {
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe();
    });
  });

  onRegionChange(): Subscription {
    return this.myForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => {
          this.myForm.get('country')!.setValue('');
          this.myForm.get('border')!.setValue('');
          this.borders.set([]);
          this.countriesByRegion.set([]);
        }),
        switchMap((region) => this.countryService.getCountriesByRegion(region!))
      )
      .subscribe((countries) => {
        this.countriesByRegion.set(countries);
      });
  }

  onCountryChange(): Subscription {
    return this.myForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => {
          this.myForm.get('border')!.setValue('');
          this.borders.set([]);
        }),
        switchMap((code) => this.countryService.getCountryByCode(code ?? '')),
        switchMap((country) =>
          this.countryService.getCountryBordersByCodes(country?.borders ?? [])
        )
      )
      .subscribe((borders) => {
        this.borders.set(borders);
      });
  }
}
