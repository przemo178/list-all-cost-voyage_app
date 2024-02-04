import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExchangeRates } from '../models/exchange-rates.model';

@Injectable({ providedIn: 'root' })
export class ExchangeRatesService {
  private jsonUrl = '../assets/exchange-rates.json';

  private selectedValueSource = new BehaviorSubject<string>('SGD');
  selectedValue$ = this.selectedValueSource.asObservable();

  // Dodajemy nowy BehaviorSubject do przechowywania calculatedRate
  private calculatedRateSource = new BehaviorSubject<number | undefined>(
    undefined
  );
  calculatedRate$ = this.calculatedRateSource.asObservable();

  constructor(private http: HttpClient) {}

  getExchangeData(): Observable<ExchangeRates> {
    return this.http.get<ExchangeRates>(this.jsonUrl);
  }

  setSelectedValue(value: string) {
    this.selectedValueSource.next(value);
  }

  // Nowa metoda do ustawiania calculatedRate
  setRate(calculatedRate: number) {
    this.calculatedRateSource.next(calculatedRate);
  }
}
