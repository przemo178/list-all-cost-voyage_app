import { Component, OnInit } from '@angular/core';
import { CommentGroupService } from 'src/app/services/comment-group.service';
import { ExchangeRatesService } from 'src/app/services/exchange-rates.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-second-single-cost',
  templateUrl: './second-single-cost.component.html',
  styleUrls: ['./second-single-cost.component.scss'],
})
export class SecondSingleCostComponent implements OnInit {
  selectedValue: string = '';
  baseQuotedValue: number = 2000;
  baseCurrency: string | undefined;
  correctedCourse: number | undefined;
  baseQuotedValueConvertedToUsd: number | undefined;
  inputValue: number = 1000;
  inputValueConvertedToUsd: number | undefined;

  constructor(
    private commentGroupService: CommentGroupService,
    private exchangeRatesService: ExchangeRatesService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    console.log('SecondSingleCostComponent initialized');

    this.sharedDataService.baseCurrency$.subscribe((baseCurrency) => {
      this.baseCurrency = baseCurrency;
    });

    this.subscribeToSelectedValue();
    this.subscribeToCorrectedCourse();

    // this.costsService.getCostsData().subscribe((data) => {
    //   this.baseCurrency = data.baseCurrency.currency;
    //   this.baseExchangeRate = data.baseCurrency.exchangeRate;

    //   if (this.baseExchangeRate !== undefined && this.baseExchangeRate !== 0) {
    //     const correctedCourse = +(1 / this.baseExchangeRate).toFixed(4);
    //     this.initialCourseUsd = correctedCourse;
    //     this.correctedCourse = correctedCourse;
    //   }
    // });

    // this.exchangeRatesService.selectedValue$.subscribe((value) => {
    //   this.selectedValue = value;
    //   // this.converte();
    // });

    // this.exchangeRatesService.correctedCourse$.subscribe((correctedCourse) => {
    //   this.correctedCourse = correctedCourse;
    //   // this.converte();
    // });

    this.selectedValue = this.sharedDataService.selectedValue;
    this.correctedCourse = this.sharedDataService.correctedCourse;

    this.sharedDataService.inputValueSecond$.subscribe((value) => {
      this.inputValue = value;
    });
  }

  toggleCommentGroup() {
    this.commentGroupService.isCommentTwoGroupVisible =
      !this.commentGroupService.isCommentTwoGroupVisible;
  }

  subscribeToSelectedValue() {
    this.exchangeRatesService.selectedValue$.subscribe((value) => {
      this.selectedValue = value;
      // Dodaj subskrypcję zmiany selectedValue
      this.sharedDataService.baseCurrency$.subscribe(() => {
        // Resetuj sumValues po zmianie selectedValue
        this.sharedDataService.resetSumValues();
      });
    });
  }

  subscribeToCorrectedCourse() {
    this.exchangeRatesService.correctedCourse$.subscribe((correctedCourse) => {
      this.correctedCourse = correctedCourse;
      this.converte();
      this.converteInput();
      this.sharedDataService.updateSumValues(
        this.inputValueConvertedToUsd ?? 0
      );
      this.sharedDataService.inputValueSecond = this.inputValue;
    });
  }

  converte() {
    if (this.correctedCourse !== undefined) {
      this.baseQuotedValueConvertedToUsd = +(
        this.baseQuotedValue / this.correctedCourse
      ).toFixed(2);
    }
  }

  onInputChange() {
    this.converteInput();
    this.sharedDataService.inputValueSecond = this.inputValue;
  }

  converteInput() {
    if (this.correctedCourse !== undefined) {
      this.inputValueConvertedToUsd = +(
        this.inputValue / this.correctedCourse
      ).toFixed(2);
    }
  }
}
