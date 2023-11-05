import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostsContainerComponent } from './components/costs-container/costs-container.component';
import { exchangeRatesResolver } from './resolvers/exchange-rates.resolver';
import { costsResolver } from './resolvers/costs.resolver';

const routes: Routes = [
  {
    path: '',
    component: CostsContainerComponent,
    resolve: {
      exchangeRates: exchangeRatesResolver,
      costs: costsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
