import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExchangeRates } from '../models/exchange-rates.model';

@Injectable({ providedIn: 'root' })
export class ExchangeRatesService {
  private jsonUrl = '../assets/exchange-rates.json';

  // private paymentCurrenciesSubject = new BehaviorSubject<PaymentCurrency[]>([]);
  // paymentCurrencies$ = this.paymentCurrenciesSubject.asObservable();

  private selectedValueSource = new BehaviorSubject<string>('SGD');
  selectedValue$ = this.selectedValueSource.asObservable();

  // Dodajemy nowy BehaviorSubject do przechowywania correctedCourse
  private correctedCourseSource = new BehaviorSubject<number | undefined>(
    undefined
  );
  correctedCourse$ = this.correctedCourseSource.asObservable();

  constructor(private http: HttpClient) {}

  getExchangeData(): Observable<ExchangeRates> {
    return this.http.get<ExchangeRates>(this.jsonUrl);
  }

  setSelectedValue(value: string) {
    this.selectedValueSource.next(value);
  }

  // Nowa metoda do ustawiania correctedCourse
  setCorrectedCourse(correctedCourse: number) {
    this.correctedCourseSource.next(correctedCourse);
  }
}
