export interface CostsData {
  daCurrency: {
    currency: string;
  };
  baseCurrency: {
    currency: string;
    exchangeRate: number;
  };
  costs: [];
}
