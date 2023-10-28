import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExchangeRates } from '../models/exchange-rates.model';

@Injectable({ providedIn: 'root' })
export class ExchangeRatesService {
  private jsonUrl = '../assets/exchange-rates.json';
  private jsonData: any;

  private paymentCurrenciesSubject = new BehaviorSubject<ExchangeRates[]>([]);
  paymentCurrencies$ = this.paymentCurrenciesSubject.asObservable();
  // Kod paymentCurrencies$ = this.paymentCurrenciesSubject.asObservable();
  //     jest odpowiedzialny za utworzenie obserwowalnego strumienia danych na podstawie BehaviorSubject. Oto wyjaśnienie:
  // paymentCurrenciesSubject jest instancją BehaviorSubject, która jest często używana w Angular do zarządzania danymi, które mogą zmieniać się w czasie.
  // this.paymentCurrenciesSubject.asObservable() jest wywołaniem metody asObservable() na BehaviorSubject. Ta metoda służy do zamiany BehaviorSubject na obserwowalny strumień danych. paymentCurrencies$ - To jest zmienna lub właściwość, która przechowuje obserwowalny strumień danych. Zwyczajowo, dodaje się znak dolara ($) na końcu nazwy zmiennej lub właściwości, aby oznaczyć, że jest to obserwowalny strumień.
  // Dzięki przekształceniu BehaviorSubject w obserwowalny strumień za pomocą asObservable(), możemy zapewnić, że tylko obserwowateli (komponentom, usługom itp.) będzie udostępniany dostęp do danych w trybie tylko do odczytu. W ten sposób nie będą mogli zmieniać danych bezpośrednio w BehaviorSubject, co pomaga w utrzymaniu integralności danych i uniknięciu niekontrolowanych zmian.
  // Kod ten jest często używany w Angular do udostępniania danych między różnymi częściami aplikacji, pozwalając jednym komponentom lub usługom na subskrypcję tych danych i reagowanie na ich zmiany bezpośrednio z BehaviorSubject.

  private selectedValueSource = new BehaviorSubject<string>('SGD');
  selectedValue$ = this.selectedValueSource.asObservable();

  constructor(private http: HttpClient) {
    this.loadExchangeRates();
  }

  private loadExchangeRates() {
    this.http.get(this.jsonUrl).subscribe((data: any) => {
      this.jsonData = data;
      const paymentCurrencies = this.jsonData.paymentCurrencies;
      this.paymentCurrenciesSubject.next(paymentCurrencies);
    });
  }
  //     Ten kod dotyczy metody loadExchangeRates w usłudze CostsService. Jest to metoda odpowiedzialna za wczytanie danych z pliku JSON i przekazanie ich do komponentów, które korzystają z tej usługi. Oto wyjaśnienie poszczególnych kroków w tej metodzie:
  // this.http.get(this.jsonUrl).subscribe((data: any) => { ... }): Ta linia kodu wykonuje żądanie HTTP GET, aby pobrać dane z pliku JSON, którego ścieżka jest określona przez this.jsonUrl. Gdy dane zostaną pobrane, zostaje wywołana funkcja zwrotna przekazująca te dane jako argument data.
  // this.jsonData = data;: Otrzymane dane z pliku JSON są przypisywane do zmiennej jsonData w celu dalszego dostępu do nich w usłudze. To pozwala na przechowywanie tych danych w usłudze, aby można je było używać w innych miejscach.
  // const paymentCurrencies = data.paymentCurrencies;: Z obiektu data zostaje wyodrębniona tablica paymentCurrencies, która zawiera dane dotyczące walut płatniczych. Ta tablica jest przypisywana do zmiennej paymentCurrencies.
  // this.paymentCurrenciesSubject.next(paymentCurrencies);: Następnie, tablica paymentCurrencies jest przekazywana do obiektu paymentCurrenciesSubject za pomocą metody next. paymentCurrenciesSubject jest instancją BehaviorSubject, który jest wykorzystywany do udostępniania tych danych jako obserwowalny strumień. Wywołanie next powoduje wysłanie tych danych do wszystkich komponentów lub usług zasubskrybowanych do paymentCurrencies$.
  // W skrócie, ta metoda wczytuje dane z pliku JSON, przypisuje je do jsonData w usłudze i przekazuje tablicę paymentCurrencies do komponentów za pomocą obserwowalnego strumienia paymentCurrencies$. Dzięki temu, komponenty mogą reagować na zmiany w danych i aktualizować widoki lub wykonywać inne operacje na tych danych.

  fetchExchangeRatesData(): Observable<ExchangeRates> {
    return this.http.get(this.jsonUrl) as Observable<ExchangeRates>;
  }

  setSelectedValue(value: string) {
    this.selectedValueSource.next(value);
  }

  //   private paymentCurrencies: any[] = [];

  //   private loadExchangeRates() {
  //     this.http.get(this.jsonUrl).subscribe((data: any) => {
  //       this.jsonData = data;
  //       console.log(this.jsonData);
  //       this.paymentCurrencies = data.paymentCurrencies;
  //       //   console.log('paymentArray z serwisu: ', this.paymentCurrencies);
  //       const toCurrencyArray = this.paymentCurrencies.map(
  //         (item: any) => item.toCurrency
  //       );
  //       this.paymentCurrencies = toCurrencyArray;
  //       //   console.log('paymentArray z serwisu: ', this.paymentCurrencies);
  //     });
  //   }

  //   this.http.get(this.jsonUrl).subscribe((data: any) => {
  //     this.jsonData = data;
  //     // Wyodrębnij "paymentCurrencies" i przypisz do tablicy
  //     this.paymentCurrencies = data.paymentCurrencies;
  //     // console.log(this.paymentCurrencies);
  //     const toCurrencyArray = this.paymentCurrencies.map(
  //       (item: any) => item.toCurrency
  //     );
  //     console.log('tablica z walutami w dropdownie: ', toCurrencyArray);

  //   getPaymentCurrencies() {
  //     return this.paymentCurrencies;
  //   }

  //   private selectedValueSource = new BehaviorSubject<string>(''); // Inicjalna wartość pusta
  //   selectedValue$ = this.selectedValueSource.asObservable();

  //   setSelectedValue(value: string) {
  //     this.selectedValueSource.next(value);
  //   }
}
