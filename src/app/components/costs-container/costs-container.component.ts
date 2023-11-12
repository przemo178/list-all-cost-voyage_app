import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, of, tap } from 'rxjs';
import { CostsData } from 'src/app/models/costs.model';
import {
  ExchangeRates,
  PaymentCurrency,
} from 'src/app/models/exchange-rates.model';
import { CostsService } from 'src/app/services/costs.service';
import { ExchangeRatesService } from 'src/app/services/exchange-rates.service';

@Component({
  selector: 'app-costs-container',
  templateUrl: './costs-container.component.html',
  styleUrls: ['./costs-container.component.scss'],
})
export class CostsContainerComponent implements OnInit {
  selectedValue: string = '';
  paymentCurrencies: PaymentCurrency[] = [];
  costsData: CostsData | undefined;
  baseCurrency: string | undefined;
  baseExchangeRate: number | undefined;
  correctedCourse: number | undefined;
  initialCorrectedCourse: number | undefined;

  constructor(
    private exchangeRatesService: ExchangeRatesService,
    private costsService: CostsService // private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.exchangeRatesService.selectedValue$.subscribe((value) => {
      this.selectedValue = value;
    });

    this.costsService.getCostsData().subscribe((allCostsData) => {
      this.costsData = allCostsData;
      console.log('ALL Costs Data:', this.costsData);
    });

    this.exchangeRatesService
      .getExchangeData()
      .pipe(map((exchangeRates) => exchangeRates.paymentCurrencies))
      .subscribe((paymentCurrencies) => {
        this.paymentCurrencies = paymentCurrencies;
        console.log('Payment Currencies:', this.paymentCurrencies);
      });

    // this.costsService
    //   .getCostsData()
    //   .pipe(map((data) => data.baseCurrency.currency))
    //   .subscribe((baseCurrency) => {
    //     this.baseCurrency = baseCurrency;
    //     console.log('Base Currency:', this.baseCurrency);
    //   });

    // this.costsService
    //   .getCostsData()
    //   .pipe(map((data) => data.baseCurrency.exchangeRate))
    //   .subscribe((baseExchangeRate) => {
    //     this.baseExchangeRate = baseExchangeRate;
    //     console.log('Base Exchange Rate:', this.baseExchangeRate);
    //   });

    this.costsService.getCostsData().subscribe((data) => {
      this.baseCurrency = data.baseCurrency.currency;
      this.baseExchangeRate = data.baseCurrency.exchangeRate;
      console.log('Base Currency:', this.baseCurrency);
      console.log('Base Exchange Rate:', this.baseExchangeRate);

      // Oblicz odwrotność kursu
      if (this.baseExchangeRate !== undefined && this.baseExchangeRate !== 0) {
        const correctedCourse = +(1 / this.baseExchangeRate).toFixed(4);
        this.initialCorrectedCourse = correctedCourse;
        this.correctedCourse = correctedCourse;
        console.log('Correct of Course:', this.correctedCourse);
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

    // this.exchangeRatesService.getExchangeData().subscribe((data) => {
    //   this.exchangeRatesData = data;
    //   console.log('Exchange Rates:', this.exchangeRatesData);
    //   this.paymentCurrencies = this.exchangeRatesData.paymentCurrencies;
    //   console.log('Payment Currencies:', this.paymentCurrencies);
    // });

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

  // updateSelectedValue(event: Event) {
  //   const selectedValue = (event.target as HTMLSelectElement).value;
  //   this.exchangeRatesService.setSelectedValue(selectedValue);

  //   // Pobierz obiekt waluty z paymentCurrencies
  //   const selectedCurrencyObject = this.paymentCurrencies.find(
  //     (currency) => currency.toCurrency === selectedValue
  //   );

  //   // Sprawdź, czy obiekt został znaleziony
  //   if (selectedCurrencyObject) {
  //     const exchangeRate = selectedCurrencyObject.exchangeRate;

  //     // Sprawdź, czy this.inverseOfCourse nie jest undefined
  //     if (this.inverseOfCourse !== undefined) {
  //       // Przelicz wartość na podstawie kursu
  //       this.inverseOfCourse = this.inverseOfCourse * exchangeRate;
  //     } else {
  //       // Obsłuż sytuację, gdy this.inverseOfCourse jest undefined
  //       console.error('this.inverseOfCourse is undefined.');
  //     }
  //   }
  // }

  updateSelectedValue(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.exchangeRatesService.setSelectedValue(selectedValue);

    // Pobierz obiekt waluty z paymentCurrencies
    const selectedCurrencyObject = this.paymentCurrencies.find(
      (currency) => currency.toCurrency === selectedValue
    );

    // Sprawdź, czy obiekt został znaleziony
    if (selectedCurrencyObject) {
      const exchangeRate = selectedCurrencyObject.exchangeRate;

      // Przelicz wartość na podstawie kursu
      this.correctedCourse = +(
        this.initialCorrectedCourse! * exchangeRate
      ).toFixed(4);
      console.log('Result:', this.correctedCourse);
    }
  }

  show() {
    console.log(this.paymentCurrencies);
  }

  get() {
    this.exchangeRatesService.getExchangeData().subscribe();
  }
}
