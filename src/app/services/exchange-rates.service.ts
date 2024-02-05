import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExchangeRates } from '../models/exchange-rates.model';

@Injectable({ providedIn: 'root' })
export class ExchangeRatesService {
  private jsonUrl = '../assets/exchange-rates.json';

  private selectedCurrencySource = new BehaviorSubject<string>('SGD');
  selectedCurrency$ = this.selectedCurrencySource.asObservable();

  // Dodajemy nowy BehaviorSubject do przechowywania calculatedRate
  private calculatedRateSource = new BehaviorSubject<number | undefined>(
    undefined
  );
  calculatedRate$ = this.calculatedRateSource.asObservable();

  constructor(private http: HttpClient) {}

  getExchangeData(): Observable<ExchangeRates> {
    return this.http.get<ExchangeRates>(this.jsonUrl);
  }

  setSelectedCurrency(value: string) {
    this.selectedCurrencySource.next(value);
  }

  // Nowa metoda do ustawiania calculatedRate
  setRate(calculatedRate: number) {
    this.calculatedRateSource.next(calculatedRate);
  }
}
