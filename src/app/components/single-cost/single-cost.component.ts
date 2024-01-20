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

    // Wywołanie funkcji wewnątrz subscribe, gdy tylko wartość baseCurrency zostanie zmieniona w serwisie.
    this.sharedDataService.baseCurrency$.subscribe((baseCurrency) => {
      this.baseCurrency = baseCurrency;
    });

    this.subscribeToSelectedValue();
    this.subscribeToCorrectedCourse();

    // Przypisanie wartości selectedValue z serwisu SharedDataService do zmiennej selectedValue w bieżącym komponencie. Oznacza to, że komponent będzie korzystał z tej wartości, która jest przechowywana i aktualizowana w serwisie. Jeżeli wartości te zmieniają się w jednym miejscu (np. w innym komponencie lub serwisie), te zmiany będą widoczne we wszystkich komponentach, które korzystają z tych zmiennych.
    this.selectedValue = this.sharedDataService.selectedValue;
    this.correctedCourse = this.sharedDataService.correctedCourse;

    // Gdy wartość tego strumienia zostanie zaktualizowana, funkcja podana w subscribe zostanie wywołana, a wartość przekazana do tej funkcji (parametr value) będzie przypisana do zmiennej inputValue w bieżącym komponencie. To jest fragment kodu, który subskrybuje strumień inputValueFirst$ z serwisu SharedDataService. Gdy wartość tego strumienia zostanie zaktualizowana, funkcja podana w subscribe zostanie wywołana, a wartość przekazana do tej funkcji (parametr value) będzie przypisana do zmiennej inputValue w bieżącym komponencie. Realizacja mechanizmu reaktywnego dostępu do danych. Kiedy indziej w kodzie, w innym komponencie lub serwisie, zostanie zmieniona wartość inputValueFirst$, ta zmiana będzie propagowana do wszystkich komponentów, które subskrybują ten strumień. Może być przydatne, gdy chcemy, aby aktualizacje wartości inputValueFirst$ były widoczne natychmiast w tym konkretnym komponencie i mogły wpływać na logikę w nim zawartą.
    this.sharedDataService.inputValueFirst$.subscribe((value) => {
      this.inputValue = value;
    });

    this.sharedDataService.inputUsdValueFirst$.subscribe((value) => {
      this.inputValueConvertedToUsd = value;
    });

    // Ustaw wartość początkową w SharedDataService
    this.sharedDataService.inputUsdValueFirst = this.inputValueConvertedToUsd!;
  }

  toggleCommentGroup() {
    this.commentGroupService.isCommentGroupVisible =
      !this.commentGroupService.isCommentGroupVisible;
  }

  // Kiedy wartość selectedValue$ zostanie zaktualizowana (na przykład po zmianie wybranej waluty), funkcja przekazana do subscribe zostanie wywołana. Wewnątrz tej funkcji dokonuje się także subskrypcja strumienia baseCurrency$ z serwisu SharedDataService. Gdy wartość baseCurrency$ zostanie zaktualizowana (na przykład w wyniku zmiany wybranej waluty), wywołana zostanie funkcja wewnątrz drugiej subskrypcji, która resetuje sumy (przy użyciu resetSumValues z sharedDataService).
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
      // jeśli this.baseQuotedValueConvertedToUsd nie jest null ani undefined, to wyrażenie przyjmuje jego wartość, w przeciwnym razie przyjmuje wartość 0.
      this.sharedDataService.updateSumUsdValues(
        this.baseQuotedValueConvertedToUsd ?? 0
      );
      this.sharedDataService.inputValueFirst = this.inputValue;
      this.sharedDataService.updateSumUsdInputValues(
        this.inputValueConvertedToUsd ?? 0
      );
    });
  }

  // Funkcja converte() przelicza wartość this.baseQuotedValue na USD przy użyciu kursu this.correctedCourse. Wynik tej konwersji jest przypisywany do zmiennej this.baseQuotedValueConvertedToUsd.
  converte() {
    if (this.correctedCourse !== undefined) {
      this.baseQuotedValueConvertedToUsd = +(
        this.baseQuotedValue / this.correctedCourse
      ).toFixed(2);
    }
  }

  // Aktualizuje dane w sharedDataService: Ustawia inputValueFirst na wartość this.inputValue. Ustawia inputUsdValueFirst na przeliczoną wartość this.inputValueConvertedToUsd.
  onInputChange() {
    this.converteInput();
    this.sharedDataService.inputValueFirst = this.inputValue;
    this.sharedDataService.inputUsdValueFirst = this.inputValueConvertedToUsd!;
    // screenedValue - nazwa
  }

  // Podobnie jak w przypadku converte(), funkcja converteInput() przelicza wartość this.inputValue na USD przy użyciu kursu this.correctedCourse. Wynik tej konwersji jest przypisywany do zmiennej this.inputValueConvertedToUsd.
  converteInput() {
    if (this.correctedCourse !== undefined) {
      this.inputValueConvertedToUsd = +(
        this.inputValue / this.correctedCourse
      ).toFixed(2);
    }
  }
}
