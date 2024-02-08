import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { AllCostsData } from 'src/app/models/costs.model';
import { PaymentCurrency } from 'src/app/models/exchange-rates.model';
import { CostsService } from 'src/app/services/costs.service';
import { ExchangeRatesService } from 'src/app/services/exchange-rates.service';

@Component({
  selector: 'app-costs-container',
  templateUrl: './costs-container.component.html',
  styleUrls: ['./costs-container.component.scss'],
})
export class CostsContainerComponent implements OnInit {
  selectedCurrency: string = 'SGD';
  paymentCurrencies: PaymentCurrency[] = [];
  baseCurrency: string;
  baseExchangeRate: number;
  calculatedRate: number; // jest to kurs przeliczony z USD na SGD, po to żeby wyświetlać przeliczenie 1 USD na dany kurs w COSTS-container
  initialRateUsd: number; // jest to kurs przeliczony z USD na SGD, po to żeby przeliczać resztę kursów na jego podstawie
  initialUsdValue: number = 1; // wartość początkowa USD w COSTS-container
  costsData: AllCostsData;

  constructor(
    private exchangeRatesService: ExchangeRatesService,
    private costsService: CostsService
  ) {}

  ngOnInit(): void {
    // Subskrybuj do zmian calculatedRate z ExchangeRatesService
    this.exchangeRatesService.calculatedRate$.subscribe((value) => {
      this.calculatedRate = value;
    });

    // Metoda subscribe przyjmuje funkcję zwrotną, która zostanie wykonana, gdy nowe dane zostaną przekazane przez strumień. W tym przypadku, kiedy dane zostaną odebrane, funkcja zwrotna przypisuje wartość do zmiennej this.costsData.
    this.costsService.getCostsData().subscribe((allCostsData) => {
      this.costsData = allCostsData;
      this.baseCurrency = allCostsData.baseCurrency.currency;
      this.baseExchangeRate = allCostsData.baseCurrency.exchangeRate;
      console.log('costs DATA: ', this.costsData);
      console.log('baseExchangeRate: ', this.baseExchangeRate);
      console.log('baseCurrency: ', this.baseCurrency);

      // Obliczenie kursu USD na SGD i ustawienie w serwisie ExchangeRatesService:
      if (this.baseExchangeRate !== undefined && this.baseExchangeRate !== 0) {
        const usdToSgdRate = +(
          this.initialUsdValue / this.baseExchangeRate
        ).toFixed(4);
        this.initialRateUsd = usdToSgdRate;
        this.calculatedRate = usdToSgdRate;
        // this.calculatedRate.next(usdToSgdRate);

        // Ustaw calculatedRate w ExchangeRatesService
        this.exchangeRatesService.setRate(usdToSgdRate);
      }
    });

    // paymentCurrencies w komponencie zostanie zaktualizowane na podstawie przetworzonych danych uzyskanych z getExchangeData(). Operator pipe pozwala na przekształcanie danych w strumieniu. Operator map przekształca dane, przekazując je do funkcji zwrotnej. W tym przypadku, pobiera paymentCurrencies z obiektu exchangeRates. Metoda subscribe przyjmuje funkcję zwrotną, która zostanie wykonana, gdy nowe przetworzone dane zostaną przekazane przez strumień. W tym przypadku, kiedy dane zostaną przetworzone, funkcja zwrotna przypisuje wartość do zmiennej this.paymentCurrencies i wyświetla ją w konsoli.
    this.exchangeRatesService
      .getExchangeData()
      .pipe(map((exchangeRates) => exchangeRates.paymentCurrencies))
      .subscribe((paymentCurrencies) => {
        this.paymentCurrencies = paymentCurrencies;
        console.log('Payment Currencies:', this.paymentCurrencies);
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

  calculate(event: Event) {
    // Pobranie wartości z dropdowna:
    const selectedCurrency = (event.target as HTMLSelectElement).value;

    // Pobierz obiekt waluty z paymentCurrencies
    const selectedCurrencyObject = this.paymentCurrencies.find(
      (currency) => currency.toCurrency === selectedCurrency
    );

    // Sprawdź, czy obiekt został znaleziony
    if (selectedCurrencyObject) {
      // Obliczenie poprawionego kursu i ustawienie w exchangeRatesService:
      const exchangeRate = selectedCurrencyObject.exchangeRate;
      const calculatedRate = +(this.initialRateUsd! * exchangeRate).toFixed(4);
      this.exchangeRatesService.setRate(calculatedRate);
    }
  }
}
