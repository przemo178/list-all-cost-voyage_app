import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { SingleCostComponent } from '../single-cost/single-cost.component';

@Component({
  selector: 'app-cost-group',
  templateUrl: './cost-group.component.html',
  styleUrls: ['./cost-group.component.scss'],
})
export class CostGroupComponent implements AfterViewInit {
  @Input() costGroup: any;

  @ViewChildren(SingleCostComponent)
  AllSingleCosts: QueryList<SingleCostComponent>;

  totalSum: number = 0;

  ngAfterViewInit() {
    // Opcjonalnie ustaw wartości początkowe dla instancji SingleCostComponent
    // this.AllSingleCosts.forEach((singleCost) => {
    //   singleCost.inputValue = 0;
    // });
  }

  calculateSum(updatedValue: number) {
    this.totalSum = this.AllSingleCosts.reduce(
      (sum, singleCost) => sum + singleCost.inputValue,
      0
    );
  }

  //   this.AllSingleCosts: Jest to kolekcja wszystkich komponentów SingleCostComponent, którą zbieramy za pomocą ViewChildren w rodzicu (ParentComponent).
  // reduce: Jest to funkcja array.reduce() w JavaScript, która jest używana do redukowania tablicy do pojedynczej wartości. W tym przypadku, służy do obliczania sumy wartości we wszystkich komponentach potomnych.(sum, singleCost) => sum + singleCost.inputValue: Jest to funkcja zwrotna przekazywana do reduce. Parametr sum to aktualna suma, a singleCost to kolejny komponent z kolekcji. Funkcja dodaje wartość inputValue z aktualnego singleCost do sumy. 0: Jest to początkowa wartość sumy. Redukcja rozpoczyna się od zera.Ostatecznie, po wykonaniu powyższej operacji redukcji, this.totalSum zawiera sumę wszystkich wartości inputValue z komponentów potomnych. Działa to w sposób dynamiczny, ponieważ każda zmiana wartości w dowolnym komponencie potomnym spowoduje ponowne obliczenie sumy.
}
