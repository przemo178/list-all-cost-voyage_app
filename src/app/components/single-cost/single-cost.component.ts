import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-single-cost',
  templateUrl: './single-cost.component.html',
  styleUrls: ['./single-cost.component.scss'],
})
export class SingleCostComponent {
  @Input() singleCost: any;
  @Input() selectedCurrency: string;
  @Input() baseCurrency: string;
  @Input() calculatedRate: number;

  @Input() inputValue: number = 0;
  @Output() updateSum = new EventEmitter<number>();

  toggleCommentGroup = true;

  // metoda do przełączania widoczności comment-group
  commentGroupVisible() {
    this.toggleCommentGroup = !this.toggleCommentGroup;
  }

  // Funkcja wywoływana przy każdej zmianie wartości w inpucie
  updateAllCostSum(value: number) {
    this.updateSum.emit(value);
  }

  // Funkcja do obliczenia Quoted value USD
  calculateQuoted(quotedValue: number) {
    return (quotedValue / this.calculatedRate).toFixed(2);
  }

  //  Funkcja do obliczenia Screened value USD z inputa
  calculateScreened() {
    return (this.inputValue / this.calculatedRate).toFixed(2);
  }
}
