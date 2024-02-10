import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CostItem } from 'src/app/models/costs.model';

@Component({
  selector: 'app-single-cost',
  templateUrl: './single-cost.component.html',
  styleUrls: ['./single-cost.component.scss'],
})
export class SingleCostComponent implements OnInit {
  @Input() singleCost: CostItem;
  @Input() selectedCurrency: string;
  @Input() baseCurrency: string;
  @Input() calculatedRate: number;

  @Input() inputValue: number = 0;
  @Output() updateSum: EventEmitter<number> = new EventEmitter<number>();
  @Output() quotedValueChange: EventEmitter<number> =
    new EventEmitter<number>();

  toggleCommentGroup = true;
  quotedValue: number;

  ngOnInit(): void {
    this.getQuotedCost();
    this.getQuotedValue();
  }

  // metoda do pobrania wartości amount z JSONa
  getQuotedCost(): void {
    this.quotedValue = this.singleCost.costs.filter(
      (cost) => cost.type === 'Quoted'
    )[0]?.amount;
  }

  // funkcja emitująca quotedValue do Cost-group
  getQuotedValue(): void {
    this.quotedValueChange.emit(this.quotedValue);
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

  // metoda do przełączania widoczności comment-group
  commentGroupVisible() {
    this.toggleCommentGroup = !this.toggleCommentGroup;
  }
}
