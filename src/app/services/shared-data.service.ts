import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  selectedValue: string = '';
  baseCurrency: string | undefined;
  correctedCourse: number | undefined;

  private _baseCurrencySubject = new BehaviorSubject<string | undefined>(
    undefined
  );
  baseCurrency$ = this._baseCurrencySubject.asObservable();

  setBaseCurrency(value: string): void {
    this._baseCurrencySubject.next(value);
  }
}
