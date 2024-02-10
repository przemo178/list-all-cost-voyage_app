import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExchangeRates } from '../models/exchange-rates.model';

@Injectable({ providedIn: 'root' })
export class ExchangeRatesService {
  private jsonUrl = '../assets/exchange-rates.json';

  // Dodajemy nowy BehaviorSubject do przechowywania calculatedRate
  calculatedRate$ = new BehaviorSubject<number>(null);

  constructor(private http: HttpClient) {}

  getExchangeData(): Observable<ExchangeRates> {
    return this.http.get<ExchangeRates>(this.jsonUrl);
  }

  // Nowa metoda do ustawiania calculatedRate
  setRate(calculatedRate: number) {
    this.calculatedRate$.next(calculatedRate);
  }
}
