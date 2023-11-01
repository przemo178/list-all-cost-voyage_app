import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ExchangeRates, PaymentCurrency } from '../models/exchange-rates.model';

@Injectable({ providedIn: 'root' })
export class ExchangeRatesService implements OnInit {
  private jsonUrl = '../assets/exchange-rates.json';
  private jsonData: any;

  // private paymentCurrenciesSubject = new BehaviorSubject<PaymentCurrency[]>([]);
  // paymentCurrencies$ = this.paymentCurrenciesSubject.asObservable();

  private selectedValueSource = new BehaviorSubject<string>('SGD');
  selectedValue$ = this.selectedValueSource.asObservable();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.loadExchangeRates();
  }

  // private loadExchangeRates() {
  //   this.http.get(this.jsonUrl).subscribe((data: any) => {
  //     this.jsonData = data;
  //     const paymentCurrencies = this.jsonData.paymentCurrencies;
  //     this.paymentCurrenciesSubject.next(paymentCurrencies);
  //   });
  // }

  getPaymentCurrencies(): Observable<PaymentCurrency[]> {
    return this.http
      .get<ExchangeRates>(this.jsonUrl)
      .pipe(map((data) => data.paymentCurrencies));
  }

  // fetchExchangeRatesData(): Observable<PaymentCurrency> {
  //   return this.http.get(this.jsonUrl) as Observable<PaymentCurrency>;
  // }

  setSelectedValue(value: string) {
    this.selectedValueSource.next(value);
  }
}
