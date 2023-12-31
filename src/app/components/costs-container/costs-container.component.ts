import { Component, OnInit, inject } from '@angular/core';
import { map, tap } from 'rxjs';
import { CostsData } from 'src/app/models/costs.model';
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
  costsData: CostsData | undefined;
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

  constructor(
    private exchangeRatesService: ExchangeRatesService,
    private costsService: CostsService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    console.log('CostsContainerComponent initialized');

    this.exchangeRatesService.selectedValue$.subscribe((value) => {
      this.selectedValue = value;
    });

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
      this.sharedDataService.setBaseCurrency(this.baseCurrency);

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

    this.sharedDataService.selectedValue = this.selectedValue;
    this.sharedDataService.correctedCourse = this.correctedCourse;

    this.sharedDataService.sumUsdValues$.subscribe((value) => {
      this.sumUsdValues = value;
      console.log('sumUsdValues: ', this.sumUsdValues);
    });

    this.sharedDataService.inputValueFirst$.subscribe(() => {
      this.calculateInputSum();
    });

    this.sharedDataService.inputValueSecond$.subscribe(() => {
      this.calculateInputSum();
    });

    this.sharedDataService.inputUsdValueFirst$.subscribe(() => {
      this.calculateUsdInputSum();
    });

    this.sharedDataService.inputUsdValueSecond$.subscribe(() => {
      this.calculateUsdInputSum();
    });

    // Dodaj subskrypcję zmiany selectedValue
    this.sharedDataService.baseCurrency$.subscribe(() => {
      // Resetuj sumValues po zmianie selectedValue
      this.sharedDataService.resetSumValues();
    });

    // this.sharedDataService.sumUsdInputValues$.subscribe((value) => {
    //   this.sumUsdInputValues = value;
    //   console.log('sumUsdInputValues: ', this.sumUsdInputValues);
    // });

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

  calculateInputSum(): void {
    this.sumInputValues =
      this.sharedDataService.inputValueFirst +
      this.sharedDataService.inputValueSecond;
  }

  calculateUsdInputSum(): void {
    this.sumUsdInputValues =
      this.sharedDataService.inputUsdValueFirst +
      this.sharedDataService.inputUsdValueSecond;
  }
}
