import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import {
  Observable,
  catchError,
  filter,
  map,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { ExchangeRatesService } from '../services/exchange-rates.service';
import { ExchangeRates, PaymentCurrency } from '../models/exchange-rates.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class ExchangeRatesResolver implements Resolve<ExchangeRates> {
//   constructor(private exchangeRatesService: ExchangeRatesService) {}

//   resolve(): Observable<ExchangeRates> {
//     console.log('cokolwiek');
//     return this.exchangeRatesService.getPaymentCurrencies().pipe(
//       map((data) => {
//         return data;
//       })

//       // switchMap((data) => {
//       //   return of(data);
//       // })
//     );
//   }

export const exchangeRatesResolver: ResolveFn<ExchangeRates> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  exchangeRatesService: ExchangeRatesService = inject(ExchangeRatesService)
): Observable<ExchangeRates> => exchangeRatesService.getPaymentCurrencies();

// resolve(): Observable<PaymentCurrency[]> {
//   return this.exchangeRatesService.getPaymentCurrencies().pipe(
//     switchMap((data) => {
//       // Tutaj możesz dodatkowo przetwarzać dane, jeśli to konieczne
//       return of(data); // Zwróć dane z resolvera
//     }),
//     catchError((error) => {
//       // Obsłuż błąd, jeśli wystąpi
//       console.error('Błąd w resolverze:', error);
//       return of([]); // Zwróć pustą tablicę lub inny obszar błędów
//     })
//   );
// }
