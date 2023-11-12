import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { ExchangeRates, PaymentCurrency } from '../models/exchange-rates.model';

@Injectable({ providedIn: 'root' })
export class ExchangeRatesService {
  private jsonUrl = '../assets/exchange-rates.json';
  private jsonData: any;

  // private paymentCurrenciesSubject = new BehaviorSubject<PaymentCurrency[]>([]);
  // paymentCurrencies$ = this.paymentCurrenciesSubject.asObservable();

  private selectedValueSource = new BehaviorSubject<string>('SGD');
  selectedValue$ = this.selectedValueSource.asObservable();

  constructor(private http: HttpClient) {}

  getExchangeData(): Observable<ExchangeRates> {
    return this.http.get<ExchangeRates>(this.jsonUrl);
  }

  setSelectedValue(value: string) {
    this.selectedValueSource.next(value);
  }
}
