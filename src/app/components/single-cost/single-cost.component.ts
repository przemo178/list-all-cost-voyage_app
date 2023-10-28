import { Component, OnInit } from '@angular/core';
import { CommentGroupService } from 'src/app/services/comment-group.service';
import { ExchangeRatesService } from 'src/app/services/exchange-rates.service';

@Component({
  selector: 'app-single-cost',
  templateUrl: './single-cost.component.html',
  styleUrls: ['./single-cost.component.scss'],
})
export class SingleCostComponent implements OnInit {
  defaultValue: number = 2000;
  inputDefaultValue = this.defaultValue.toFixed(2);
  placeholder = 'SGD';
  selectedValue: string = '';

  constructor(
    private commentGroupService: CommentGroupService,
    private exchangeRatesService: ExchangeRatesService
  ) {}

  ngOnInit(): void {
    this.subscribeToSelectedValue();
  }

  toggleCommentGroup() {
    this.commentGroupService.isCommentGroupVisible =
      !this.commentGroupService.isCommentGroupVisible;
  }

  subscribeToSelectedValue() {
    this.exchangeRatesService.selectedValue$.subscribe((value) => {
      this.selectedValue = value;
    });
  }
}
