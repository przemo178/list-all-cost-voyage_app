import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  // selectedValue, baseCurrency, i correctedCourse. Są to pola przechowujące aktualne wartości danych w serwisie.
  selectedValue: string = '';
  baseCurrency: string | undefined;
  correctedCourse: number | undefined;

  //  BehaviorSubject do utworzenia obiektów, które przechowują bieżącą wartość danej. BehaviorSubject to rodzaj obserwatora w RxJS, który przechowuje bieżącą wartość oraz emituje ją do wszystkich subskrybentów, gdy są zapisywane nowe dane.
  private _baseCurrencySubject = new BehaviorSubject<string | undefined>(
    undefined
  );

  // Obserwable Properties: Na podstawie BehaviorSubject utworzono różne właściwości Observable, takie jak baseCurrency$, sumUsdValues$, itp. Są to obserwable, które inne komponenty mogą subskrybować, aby otrzymywać powiadomienia o zmianach danych. Metody aktualizacji danych: W klasie utworzono metody, takie jak updateSumUsdValues, updateSelectedValue, itp., które pozwalają na aktualizację wartości pól danych w serwisie. Te metody używają BehaviorSubject.next(), aby przekazać nowe wartości do obserwatorów.
  baseCurrency$ = this._baseCurrencySubject.asObservable();

  private _sumUsdValuesSubject = new BehaviorSubject<number>(0);
  sumUsdValues$ = this._sumUsdValuesSubject.asObservable();

  private _inputValueFirstSubject = new BehaviorSubject<number>(0);
  inputValueFirst$ = this._inputValueFirstSubject.asObservable();

  private _inputValueSecondSubject = new BehaviorSubject<number>(0);
  inputValueSecond$ = this._inputValueSecondSubject.asObservable();

  private _sumUsdInputValuesSubject = new BehaviorSubject<number>(0);
  sumUsdInputValues$ = this._sumUsdInputValuesSubject.asObservable();

  private _inputUsdValueFirstSubject = new BehaviorSubject<number>(0);
  inputUsdValueFirst$ = this._inputUsdValueFirstSubject.asObservable();

  private _inputUsdValueSecondSubject = new BehaviorSubject<number>(0);
  inputUsdValueSecond$ = this._inputUsdValueSecondSubject.asObservable();

  // Metoda setBaseCurrency w serwisie SharedDataService używa _baseCurrencySubject.next(value); do aktualizacji wartości przechowywanej w BehaviorSubject. W skrócie, ta metoda służy do ustawienia nowej wartości dla baseCurrency i powiadamiania wszystkich subskrybentów (komponentów, które subskrybują baseCurrency$) o tej zmianie. Kiedy ta metoda jest wywoływana z nową wartością value, ta wartość jest przekazywana jako nowa wartość dla BehaviorSubject, a wszyscy subskrybenci dostaną powiadomienie o tej zmianie i otrzymają tę nową wartość. To jest jedna z podstawowych funkcji BehaviorSubject w RxJS.
  setBaseCurrency(value: string): void {
    this._baseCurrencySubject.next(value);
  }

  // Metoda updateSumUsdValues w serwisie SharedDataService aktualizuje sumę sumUsdValues$ poprzez dodanie wartości value do bieżącej sumy. Wykorzystuje _sumUsdValuesSubject do przechowywania i emisji nowej sumy.Pobiera bieżącą sumę z _sumUsdValuesSubject.value. Dodaje wartość value do bieżącej sumy, uzyskując newSum. Ustawia nową sumę jako wartość _sumUsdValuesSubject poprzez wywołanie this._sumUsdValuesSubject.next(newSum).To pozwala na śledzenie sumy sumUsdValues$ i aktualizowanie jej wartości w serwisie, a wszystkie komponenty subskrybujące tę wartość dostaną aktualizacje, gdy zostanie wywołana ta metoda.
  updateSumUsdValues(value: number): void {
    const currentSum = this._sumUsdValuesSubject.value;
    const newSum = currentSum + value;
    this._sumUsdValuesSubject.next(newSum);
  }

  updateSumUsdInputValues(value: number): void {
    const currentSum = this._sumUsdInputValuesSubject.value;
    const newSum = currentSum + value;
    this._sumUsdInputValuesSubject.next(newSum);
  }

  // To pozwala na resetowanie sum i późniejsze ich ponowne obliczanie i aktualizowanie.
  resetSumValues(): void {
    this._sumUsdValuesSubject.next(0);
    this._sumUsdInputValuesSubject.next(0);
  }

  //  gettery i settery dotyczace inputów
  // Te dwie pary getterów i setterów są do zdefiniowania i manipulowania dwoma zmiennymi: inputValueFirst i inputValueSecond.
  // get inputValueFirst(): number zwraca aktualną wartość _inputValueFirstSubject. set inputValueFirst(value: number) ustawia nową wartość _inputValueFirstSubject na podstawie dostarczonej wartości value.
  // Te pary getterów i setterów pozwalają na odczytywanie i ustawianie wartości zmiennych inputValueFirst i inputValueSecond. W przypadku setterów, gdy zmienia się wartość, informuje to wszystkich subskrybentów danego observable'a (poprzez next(value)), co umożliwia reakcję na zmianę tej wartości.

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
