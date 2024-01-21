import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, shareReplay } from 'rxjs';
import { CostsData } from '../models/costs.model';

@Injectable({ providedIn: 'root' })
export class CostsService {
  private jsonUrl = '../assets/costs.json';

  constructor(private http: HttpClient) {}

  getCostsData(): Observable<CostsData> {
    return this.http.get<CostsData>(this.jsonUrl);
  }

  // tutaj jest mój nowy kod z drugiego podejścia
}
