import { Component, OnInit } from '@angular/core';
import { CostsData } from 'src/app/models/costs.model';
import { CostsService } from 'src/app/services/costs.service';

@Component({
  selector: 'app-cost-group',
  templateUrl: './cost-group.component.html',
  styleUrls: ['./cost-group.component.scss'],
})
export class CostGroupComponent implements OnInit {
  // moje drugie podejście
  costsData: CostsData | undefined;

  constructor(private costsService: CostsService) {}

  ngOnInit(): void {
    this.costsService.getCostsData().subscribe((allCostsData) => {
      this.costsData = allCostsData;
      console.log('costs DATA from COST GROUP: ', this.costsData);
    });
  }
}
