import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {
  ExchangeRates,
  PaymentCurrency,
} from 'src/app/models/exchange-rates.model';
import { ExchangeRatesService } from 'src/app/services/exchange-rates.service';

@Component({
  selector: 'app-costs-container',
  templateUrl: './costs-container.component.html',
  styleUrls: ['./costs-container.component.scss'],
})
export class CostsContainerComponent implements OnInit {
  selectedValue: string = 'SGD';
  paymentCurrencies: PaymentCurrency[] = [];

  // exchangeRatesData: ExchangeRates[] = [];

  constructor(
    private exchangeRatesService: ExchangeRatesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.exchangeRatesService.selectedValue$.subscribe((value) => {
      this.selectedValue = value;
    });

    // this.exchangeRatesService.getPaymentCurrencies().subscribe((data) => {
    //   this.paymentCurrencies = data;
    // });

    this.paymentCurrencies = this.route.snapshot.data['paymentCurrencies'];
  }

  show() {
    console.log(this.paymentCurrencies);
  }

  updateSelectedValue(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.exchangeRatesService.setSelectedValue(selectedValue);
  }
}
