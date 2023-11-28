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

  private _sumUsdValuesSubject = new BehaviorSubject<number>(0);
  sumUsdValues$ = this._sumUsdValuesSubject.asObservable();

  private _inputValueFirstSubject = new BehaviorSubject<number>(0);
  inputValueFirst$ = this._inputValueFirstSubject.asObservable();

  private _inputValueSecondSubject = new BehaviorSubject<number>(0);
  inputValueSecond$ = this._inputValueSecondSubject.asObservable();

  //   private _sumUsdInputValuesSubject = new BehaviorSubject<number>(0);
  //   sumUsdInputValues$ = this._sumUsdInputValuesSubject.asObservable();

  private _inputUsdValueFirstSubject = new BehaviorSubject<number>(0);
  inputUsdValueFirst$ = this._inputUsdValueFirstSubject.asObservable();

  private _inputUsdValueSecondSubject = new BehaviorSubject<number>(0);
  inputUsdValueSecond$ = this._inputUsdValueSecondSubject.asObservable();

  setBaseCurrency(value: string): void {
    this._baseCurrencySubject.next(value);
  }

  updateSumUsdValues(value: number): void {
    const currentSum = this._sumUsdValuesSubject.value;
    const newSum = currentSum + value;
    console.log('Current Sum:', currentSum);
    console.log('Value to add:', value);
    console.log('New Sum:', newSum);
    this._sumUsdValuesSubject.next(newSum);
  }

  //   updateSumUsdInputValues(value: number): void {
  //     const currentSum = this._sumUsdInputValuesSubject.value;
  //     const newSum = currentSum + value;
  //     console.log('Current Input Sum:', currentSum);
  //     console.log('Value Input to add:', value);
  //     console.log('New Input Sum:', newSum);
  //     this._sumUsdInputValuesSubject.next(newSum);
  //   }

  resetSumValues(): void {
    this._sumUsdValuesSubject.next(0);
    // this._sumUsdInputValuesSubject.next(0);
  }

  //  gettery i settery dotyczace inputów

  get inputValueFirst(): number {
    return this._inputValueFirstSubject.value;
  }

  set inputValueFirst(value: number) {
    this._inputValueFirstSubject.next(value);
  }

  get inputValueSecond(): number {
    return this._inputValueSecondSubject.value;
  }

  set inputValueSecond(value: number) {
    this._inputValueSecondSubject.next(value);
  }

  //  gettery i settery dotyczace wartości w USD pod każdym inputem

  get inputUsdValueFirst(): number {
    return this._inputUsdValueFirstSubject.value;
  }

  set inputUsdValueFirst(value: number) {
    this._inputUsdValueFirstSubject.next(value);
  }

  get inputUsdValueSecond(): number {
    return this._inputUsdValueSecondSubject.value;
  }

  set inputUsdValueSecond(value: number) {
    this._inputUsdValueSecondSubject.next(value);
  }
}
