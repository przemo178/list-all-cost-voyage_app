import { Component, OnInit } from '@angular/core';
import { CommentGroupService } from 'src/app/services/comment-group.service';
import { CostsService } from 'src/app/services/costs.service';
import { ExchangeRatesService } from 'src/app/services/exchange-rates.service';

@Component({
  selector: 'app-second-single-cost',
  templateUrl: './second-single-cost.component.html',
  styleUrls: ['./second-single-cost.component.scss'],
})
export class SecondSingleCostComponent implements OnInit {
  defaultValue: number = 1000;
  inputDefaultValue = this.defaultValue.toFixed(2);
  placeholder = 'SGD';
  selectedValue: string = '';
  baseQuotedValue: number = 2000;
  baseCurrency: string | undefined;
  baseExchangeRate: number | undefined;
  correctedCourse: number | undefined;
  initialCourseUsd: number | undefined;
  baseQuotedValueConvertedToUsd: number | undefined;

  constructor(
    private commentGroupService: CommentGroupService,
    private exchangeRatesService: ExchangeRatesService,
    private costsService: CostsService
  ) {}

  ngOnInit(): void {
    console.log('SecondSingleCostComponent initialized');

    this.subscribeToSelectedValue();
    this.subscribeToCorrectedCourse();

    this.costsService.getCostsData().subscribe((data) => {
      this.baseCurrency = data.baseCurrency.currency;
      this.baseExchangeRate = data.baseCurrency.exchangeRate;

      if (this.baseExchangeRate !== undefined && this.baseExchangeRate !== 0) {
        const correctedCourse = +(1 / this.baseExchangeRate).toFixed(4);
        this.initialCourseUsd = correctedCourse;
        this.correctedCourse = correctedCourse;
      }
    });

    this.exchangeRatesService.selectedValue$.subscribe((value) => {
      this.selectedValue = value;
      // this.converte();
    });

    this.exchangeRatesService.correctedCourse$.subscribe((correctedCourse) => {
      this.correctedCourse = correctedCourse;
      // this.converte();
    });
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

  subscribeToCorrectedCourse() {
    this.exchangeRatesService.correctedCourse$.subscribe((correctedCourse) => {
      this.correctedCourse = correctedCourse;
      this.converte();
    });
  }

  converte() {
    if (this.correctedCourse !== undefined) {
      this.baseQuotedValueConvertedToUsd = +(
        this.baseQuotedValue / this.correctedCourse
      ).toFixed(2);
      console.log(
        'przeliczona wartość kursu wiersz 2:',
        this.baseQuotedValueConvertedToUsd
      );
    }
  }
}
