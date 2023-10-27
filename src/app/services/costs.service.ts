import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CostsService {
  private selectedValueSource = new BehaviorSubject<string>(''); // Inicjalna wartość pusta
  selectedValue$ = this.selectedValueSource.asObservable();

  setSelectedValue(value: string) {
    this.selectedValueSource.next(value);
  }
}
