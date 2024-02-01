import { Component, OnInit, inject } from '@angular/core';
import { map, tap } from 'rxjs';
import { AllCostsData, Cost } from 'src/app/models/costs.model';
import { PaymentCurrency } from 'src/app/models/exchange-rates.model';
import { CostsService } from 'src/app/services/costs.service';
import { ExchangeRatesService } from 'src/app/services/exchange-rates.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-costs-container',
  templateUrl: './costs-container.component.html',
  styleUrls: ['./costs-container.component.scss'],
})
export class CostsContainerComponent implements OnInit {
  selectedValue: string = '';
  paymentCurrencies: PaymentCurrency[] = [];
  baseCurrency: string | undefined;
  baseExchangeRate: number | undefined;
  correctedCourse: number | undefined;
  initialCourseUsd: number | undefined;
  baseQuotedValueBargeExpenses: number | undefined;
  baseQuotedValueFireGuard: number | undefined;
  baseQuotedValues: number = 3000;
  sumUsdValues: number = 0;
  sumInputValues: number = 0;
  sumUsdInputValues: number = 0;
  costsData: AllCostsData | undefined;

  constructor(
    private exchangeRatesService: ExchangeRatesService,
    private costsService: CostsService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    // To jest subskrypcja do obserwatora, która nasłuchuje zmian w strumieniu wartości związanej z selectedValue$ w serwisie ExchangeRatesService. Kiedy wartość selectedValue$ w serwisie ExchangeRatesService zmieni się, ta subskrypcja reaguje na zmianę. Funkcja przekazana do subscribe zostanie wykonana, a nowa wartość value będzie dostępna w ciele funkcji.
    this.exchangeRatesService.selectedValue$.subscribe((value) => {
      this.selectedValue = value;
    });

    // Subskrybuj do zmian correctedCourse z ExchangeRatesService
    this.exchangeRatesService.correctedCourse$.subscribe((correctedCourse) => {
      this.correctedCourse = correctedCourse;
    });

    // Metoda subscribe przyjmuje funkcję zwrotną, która zostanie wykonana, gdy nowe dane zostaną przekazane przez strumień. W tym przypadku, kiedy dane zostaną odebrane, funkcja zwrotna przypisuje wartość do zmiennej this.costsData.
    this.costsService.getCostsData().subscribe((allCostsData) => {
      this.costsData = allCostsData;
      console.log('costs DATA: ', this.costsData);
    });

    // paymentCurrencies w komponencie zostanie zaktualizowane na podstawie przetworzonych danych uzyskanych z getExchangeData(). Operator pipe pozwala na przekształcanie danych w strumieniu. Operator map przekształca dane, przekazując je do funkcji zwrotnej. W tym przypadku, pobiera paymentCurrencies z obiektu exchangeRates. Metoda subscribe przyjmuje funkcję zwrotną, która zostanie wykonana, gdy nowe przetworzone dane zostaną przekazane przez strumień. W tym przypadku, kiedy dane zostaną przetworzone, funkcja zwrotna przypisuje wartość do zmiennej this.paymentCurrencies i wyświetla ją w konsoli.
    this.exchangeRatesService
      .getExchangeData()
      .pipe(map((exchangeRates) => exchangeRates.paymentCurrencies))
      .subscribe((paymentCurrencies) => {
        this.paymentCurrencies = paymentCurrencies;
        console.log('Payment Currencies:', this.paymentCurrencies);
      });

    this.costsService.getCostsData().subscribe((data) => {
      // Aktualizacja wartości baseCurrency i baseExchangeRate:
      this.baseCurrency = data.baseCurrency.currency;
      this.baseExchangeRate = data.baseCurrency.exchangeRate;
      console.log('Base Currency:', this.baseCurrency);
      console.log('Base Exchange Rate:', this.baseExchangeRate);
      // Ustawienie baseCurrency w serwisie SharedDataService:
      this.sharedDataService.setBaseCurrency(this.baseCurrency);

      // Obliczenie odwrotności kursu i ustawienie w serwisie ExchangeRatesService:
      if (this.baseExchangeRate !== undefined && this.baseExchangeRate !== 0) {
        const correctedCourse = +(1 / this.baseExchangeRate).toFixed(4);
        this.initialCourseUsd = correctedCourse;
        this.correctedCourse = correctedCourse;
        console.log('Correct of Course:', this.correctedCourse);

        // Ustaw correctedCourse w ExchangeRatesService
        this.exchangeRatesService.setCorrectedCourse(correctedCourse);
      }
    });

    this.exchangeRatesService
      .getExchangeData()
      .pipe(
        map((exchangeRates) =>
          exchangeRates.paymentCurrencies.map(
            (currency) => currency.exchangeRate
          )
        ),
        tap((exchangeRatesArray) => {
          console.log('Exchange Rates Array:', exchangeRatesArray);
        })
      )
      .subscribe();

    // this.paymentCurrencies = this.route.snapshot.data['paymentCurrencies'];

    // this.route.data.pipe(
    //   map((exchangeRates) => {
    //     this.paymentCurrencies = exchangeRates['paymentCurrencies'];
    //     return exchangeRates;
    //   })
    // );
    // .subscribe((value) => {
    //   console.log(value);
    // });
    // console.log('exchangeRates z resolvera: ', this.route.snapshot);

    // this.costsService.getCostsData().subscribe((value) => {
    //   console.log('dane z COSTSservice: ', value);
    // });

    // this.costsData = this.route.snapshot.data['costs'];
    // console.log('costsData z resolvera: ', this.costsData);
  }

  updateSelectedValue(event: Event) {
    // Pobranie wartości z dropdowna:
    const selectedValue = (event.target as HTMLSelectElement).value;
    // Ustawienie wybranej wartości w exchangeRatesService:
    this.exchangeRatesService.setSelectedValue(selectedValue);

    // Pobierz obiekt waluty z paymentCurrencies
    const selectedCurrencyObject = this.paymentCurrencies.find(
      (currency) => currency.toCurrency === selectedValue
    );

    // Sprawdź, czy obiekt został znaleziony
    if (selectedCurrencyObject) {
      // Obliczenie poprawionego kursu i ustawienie w exchangeRatesService:
      const exchangeRate = selectedCurrencyObject.exchangeRate;
      const correctedCourse = +(this.initialCourseUsd! * exchangeRate).toFixed(
        4
      );
      this.exchangeRatesService.setCorrectedCourse(correctedCourse);
      console.log('Result:', this.correctedCourse);
    }
  }
}
