import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ExchangeRatesService } from '../services/exchange-rates.service';
import { ExchangeRates } from '../models/exchange-rates.model';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRatesResolver implements Resolve<ExchangeRates> {
  constructor(private exchangeRatesService: ExchangeRatesService) {}

  resolve(): Observable<ExchangeRates> {
    return this.exchangeRatesService.fetchExchangeRatesData();
  }
}
