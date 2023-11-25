import { Component, OnInit } from '@angular/core';
import { CommentGroupService } from 'src/app/services/comment-group.service';
import { ExchangeRatesService } from 'src/app/services/exchange-rates.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-single-cost',
  templateUrl: './single-cost.component.html',
  styleUrls: ['./single-cost.component.scss'],
})
export class SingleCostComponent implements OnInit {
  selectedValue: string = '';
  baseQuotedValue: number = 1000;
  baseCurrency: string | undefined;
  correctedCourse: number | undefined;
  baseQuotedValueConvertedToUsd: number | undefined;
  inputValue: number = 2000;
  inputValueConvertedToUsd: number | undefined;

  constructor(
    private commentGroupService: CommentGroupService,
    private exchangeRatesService: ExchangeRatesService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    console.log('SingleCostComponent initialized');

    this.sharedDataService.baseCurrency$.subscribe((baseCurrency) => {
      this.baseCurrency = baseCurrency;
      console.log('baseCurrency z single:', this.baseCurrency);
    });

    this.subscribeToSelectedValue();
    this.subscribeToCorrectedCourse();

    this.selectedValue = this.sharedDataService.selectedValue;
    this.correctedCourse = this.sharedDataService.correctedCourse;
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
      this.converteInput();
    });
  }

  converte() {
    if (this.correctedCourse !== undefined) {
      this.baseQuotedValueConvertedToUsd = +(
        this.baseQuotedValue / this.correctedCourse
      ).toFixed(2);
      console.log(
        'przeliczona wartość kursu wiersz 1:',
        this.baseQuotedValueConvertedToUsd
      );
    }
  }

  onInputChange() {
    this.converteInput();
  }

  converteInput() {
    if (this.correctedCourse !== undefined) {
      this.inputValueConvertedToUsd = +(
        this.inputValue / this.correctedCourse
      ).toFixed(2);
      console.log('Converte input wiersz 1:', this.inputValueConvertedToUsd);
    }
  }
}
