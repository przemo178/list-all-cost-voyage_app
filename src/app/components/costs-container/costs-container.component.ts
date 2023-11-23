import { Component, OnInit, inject } from '@angular/core';
import { map, tap } from 'rxjs';
import { CostsData } from 'src/app/models/costs.model';
import { PaymentCurrency } from 'src/app/models/exchange-rates.model';
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
  initialCourseUsd: number | undefined;
  baseQuotedValueBargeExpenses: number | undefined;
  baseQuotedValueFireGuard: number | undefined;
  baseQuotedValues: number | undefined;

  constructor(
    private exchangeRatesService: ExchangeRatesService,
    private costsService: CostsService
  ) {}

  ngOnInit(): void {
    console.log('CostsContainerComponent initialized');

    this.exchangeRatesService.selectedValue$.subscribe((value) => {
      this.selectedValue = value;
    });

    // Pobierz wartości z serwisu
    // this.baseQuotedValueBargeExpenses =
    //   this.exchangeRatesService.baseQuotedValueBargeExpenses;
    // console.log(
    //   'baseQuotedValueBargeExpenses: ',
    //   this.baseQuotedValueBargeExpenses
    // );
    // this.baseQuotedValueFireGuard =
    //   this.exchangeRatesService.baseQuotedValueFireGuard;
    // console.log('baseQuotedValueFireGuard: ', this.baseQuotedValueFireGuard);

    // Subskrybuj do zmian correctedCourse z ExchangeRatesService
    this.exchangeRatesService.correctedCourse$.subscribe((correctedCourse) => {
      this.correctedCourse = correctedCourse;
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

    this.costsService.getCostsData().subscribe((data) => {
      this.baseCurrency = data.baseCurrency.currency;
      this.baseExchangeRate = data.baseCurrency.exchangeRate;
      console.log('Base Currency:', this.baseCurrency);
      console.log('Base Exchange Rate:', this.baseExchangeRate);

      // Oblicz odwrotność kursu
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
      const correctedCourse = +(this.initialCourseUsd! * exchangeRate).toFixed(
        4
      );
      this.exchangeRatesService.setCorrectedCourse(correctedCourse);
      console.log('Result:', this.correctedCourse);
    }
  }
}
