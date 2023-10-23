import { Component } from '@angular/core';

@Component({
  selector: 'app-single-cost',
  templateUrl: './single-cost.component.html',
  styleUrls: ['./single-cost.component.scss'],
})
export class SingleCostComponent {
  defaultValue: number = 2000;
  inputDefaultValue = this.defaultValue.toFixed(2);
  placeholder = 'SGD';
}
