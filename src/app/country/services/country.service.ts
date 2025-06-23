import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({ providedIn: 'root' })
export class CountryService {
  constructor() {}
  private readonly baseUrl = 'https://restcountries.com/v3.1';
  private readonly http = inject(HttpClient);

  private readonly _regions = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if (!region) return of([]);

    console.log({ region });
    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;

    return this.http.get<Country[]>(url);
  }

  getCountryByCode(code: string): Observable<Country | null> {
    if (!code) return of(null);
    const url = `${this.baseUrl}/alpha/${code}?fields=cca3,name,borders`;
    return this.http.get<Country>(url);
  }

  getCountryBordersByCodes(codes: string[]): Observable<Country[]> {
    if (!codes || codes.length === 0) return of([]);
    const codesParam = codes.join(',');
    const url = `${this.baseUrl}/alpha?codes=${codesParam}&fields=cca3,name,borders`;
    return this.http.get<Country[]>(url);
  }
}
