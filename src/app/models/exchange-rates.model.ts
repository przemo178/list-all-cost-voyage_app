// export interface ExchangeRates {
//   sourceCurrency: string;
//   paymentCurrencies: {
//     fromCurrency: string;
//     toCurrency: string;
//     exchangeRate: number;
//   }[];
// }

export interface ExchangeRates {
  sourceCurrency: string;
  paymentCurrencies: PaymentCurrency[];
}

export interface PaymentCurrency {
  fromCurrency: string;
  toCurrency: string;
  exchangeRate: number;
}
