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

  // Metoda setBaseCurrency w serwisie SharedDataService używa _baseCurrencySubject.next(value); do aktualizacji wartości przechowywanej w BehaviorSubject. W skrócie, ta metoda służy do ustawienia nowej wartości dla baseCurrency i powiadamiania wszystkich subskrybentów (komponentów, które subskrybują baseCurrency$) o tej zmianie. Kiedy ta metoda jest wywoływana z nową wartością value, ta wartość jest przekazywana jako nowa wartość dla BehaviorSubject, a wszyscy subskrybenci dostaną powiadomienie o tej zmianie i otrzymają tę nową wartość. To jest jedna z podstawowych funkcji BehaviorSubject w RxJS.
  setBaseCurrency(value: string): void {
    this._baseCurrencySubject.next(value);
  }
}
