import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, shareReplay } from 'rxjs';
import { AllCostsData } from '../models/costs.model';
import { SingleCostComponent } from '../components/single-cost/single-cost.component';

@Injectable({ providedIn: 'root' })
export class CostsService {
  private jsonUrl = '../assets/costs.json';

  constructor(private http: HttpClient) {}

  getCostsData(): Observable<AllCostsData> {
    return this.http.get<AllCostsData>(this.jsonUrl);
  }

  calculateTotalSum(singleCosts: SingleCostComponent[]): number {
    return singleCosts.reduce(
      (sum, singleCost) => sum + singleCost.inputValue,
      0
    );
  }
}
