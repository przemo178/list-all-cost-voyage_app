import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { ExchangeRatesService } from '../services/exchange-rates.service';
import { ExchangeRates, PaymentCurrency } from '../models/exchange-rates.model';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRatesResolver implements Resolve<PaymentCurrency[]> {
  constructor(private exchangeRatesService: ExchangeRatesService) {}

  resolve(): Observable<PaymentCurrency[]> {
    return this.exchangeRatesService.getPaymentCurrencies();
  }

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
}
