import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { costsResolver } from './resolvers/costs.resolver';
// import { exchangeRatesResolver } from './resolvers/exchange-rates.resolver';
// import { CostsContainerComponent } from './components/costs-container/costs-container.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: CostsContainerComponent,
//     resolve: {
//       costs: costsResolver,
//       exchangeRates: exchangeRatesResolver,
//     },
//   },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
//   providers: [
//     {
//       provide: costsResolver,
//     },
//     {
//       provide: exchangeRatesResolver,
//     },
//   ],
// })
// export class AppRoutingModule {}
