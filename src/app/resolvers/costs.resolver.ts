import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { AllCostsData } from '../models/costs.model';
import { CostsService } from '../services/costs.service';

@Injectable({
  providedIn: 'root',
})
export class costsResolver implements Resolve<AllCostsData> {
  constructor(private costsService: CostsService) {}

  resolve(): Observable<AllCostsData> {
    return this.costsService.getCostsData();
  }
}

// const data = this.costsService.getCostsData();
// console.log('Logowanie danych do konsoli w serwisie: ', data);
// return data;

// export const costsResolver: ResolveFn<CostsData> = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot,
//   costsService: CostsService = inject(CostsService)
// ): Observable<CostsData> => costsService.getCostsData()
