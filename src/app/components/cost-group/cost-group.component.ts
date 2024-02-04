import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { SingleCostComponent } from '../single-cost/single-cost.component';
import { CostsService } from 'src/app/services/costs.service';

@Component({
  selector: 'app-cost-group',
  templateUrl: './cost-group.component.html',
  styleUrls: ['./cost-group.component.scss'],
})
export class CostGroupComponent implements OnInit {
  @Input() costGroup: any;
  @Input() selectedValue: string;
  @Input() baseCurrency: string;
  @Input() calculatedRate: number;

  // @ViewChildren to dekorator w Angular używany do uzyskiwania dostępu do wszystkich wystąpień danego komponentu w widoku. W tym przypadku, ViewChildren(SingleCostComponent) oznacza, że chcesz uzyskać dostęp do wszystkich wystąpień komponentu SingleCostComponent w bieżącym widoku.
  @ViewChildren(SingleCostComponent)
  AllSingleCosts: QueryList<SingleCostComponent>;

  totalSum: number = 0;
  totalSumUsd: number;

  constructor(private costsService: CostsService) {}

  ngOnInit(): void {
    if (this.AllSingleCosts) {
      const initialValue = 1;
      this.calculateSum(initialValue);
    }
  }

  calculateSum(updatedValue: number) {
    this.totalSum = this.costsService.calculateTotalSum(
      this.AllSingleCosts.toArray()
    );
  }

  convertSumToUsd() {
    return (this.totalSum * this.calculatedRate).toFixed(2);
  }

  //   this.AllSingleCosts: Jest to kolekcja wszystkich komponentów SingleCostComponent, którą zbieramy za pomocą ViewChildren w rodzicu (ParentComponent).
  // reduce: Jest to funkcja array.reduce() w JavaScript, która jest używana do redukowania tablicy do pojedynczej wartości. W tym przypadku, służy do obliczania sumy wartości we wszystkich komponentach potomnych.(sum, singleCost) => sum + singleCost.inputValue: Jest to funkcja zwrotna przekazywana do reduce. Parametr sum to aktualna suma, a singleCost to kolejny komponent z kolekcji. Funkcja dodaje wartość inputValue z aktualnego singleCost do sumy. 0: Jest to początkowa wartość sumy. Redukcja rozpoczyna się od zera.Ostatecznie, po wykonaniu powyższej operacji redukcji, this.totalSum zawiera sumę wszystkich wartości inputValue z komponentów potomnych. Działa to w sposób dynamiczny, ponieważ każda zmiana wartości w dowolnym komponencie potomnym spowoduje ponowne obliczenie sumy.
}
