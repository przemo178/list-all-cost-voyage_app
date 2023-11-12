export interface ExchangeRates {
  sourceCurrency: string;
  paymentCurrencies: PaymentCurrency[];
}

export interface PaymentCurrency {
  fromCurrency: string;
  toCurrency: string;
  exchangeRate: number;
}
