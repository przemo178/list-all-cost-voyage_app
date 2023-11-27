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

  private _sumValuesSubject = new BehaviorSubject<number>(0);
  sumValues$ = this._sumValuesSubject.asObservable();

  private _inputValueSingleSubject = new BehaviorSubject<number>(0);
  inputValueSingle$ = this._inputValueSingleSubject.asObservable();

  private _inputValueSecondSubject = new BehaviorSubject<number>(0);
  inputValueSecond$ = this._inputValueSecondSubject.asObservable();

  setBaseCurrency(value: string): void {
    this._baseCurrencySubject.next(value);
  }

  updateSumValues(value: number): void {
    const currentSum = this._sumValuesSubject.value;
    const newSum = currentSum + value;
    console.log('Current Sum:', currentSum);
    console.log('Value to add:', value);
    console.log('New Sum:', newSum);
    this._sumValuesSubject.next(newSum);
  }

  resetSumValues(): void {
    this._sumValuesSubject.next(0);
  }

  get inputValueSingle(): number {
    return this._inputValueSingleSubject.value;
  }

  set inputValueSingle(value: number) {
    this._inputValueSingleSubject.next(value);
  }

  get inputValueSecond(): number {
    return this._inputValueSecondSubject.value;
  }

  set inputValueSecond(value: number) {
    this._inputValueSecondSubject.next(value);
  }
}
