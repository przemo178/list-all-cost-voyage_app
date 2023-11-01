import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostsContainerComponent } from './components/costs-container/costs-container.component';
import { ExchangeRatesResolver } from './resolvers/exchange-rates.resolver';

const routes: Routes = [
  {
    path: '',
    component: CostsContainerComponent,
    resolve: {
      paymentCurrencies: ExchangeRatesResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    // {
    //   provide: costsResolver,
    // },
    {
      provide: ExchangeRatesResolver,
    },
  ],
})
export class AppRoutingModule {}
