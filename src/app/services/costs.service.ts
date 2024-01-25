import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, shareReplay } from 'rxjs';
import { AllCostsData } from '../models/costs.model';

@Injectable({ providedIn: 'root' })
export class CostsService {
  private jsonUrl = '../assets/costs.json';

  constructor(private http: HttpClient) {}

  getCostsData(): Observable<AllCostsData> {
    return this.http.get<AllCostsData>(this.jsonUrl);
  }

  // tutaj jest mój nowy kod z drugiego podejścia
}
