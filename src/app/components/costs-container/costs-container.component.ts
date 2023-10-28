import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExchangeRates } from 'src/app/models/exchange-rates.model';
import { ExchangeRatesService } from 'src/app/services/exchange-rates.service';

@Component({
  selector: 'app-costs-container',
  templateUrl: './costs-container.component.html',
  styleUrls: ['./costs-container.component.scss'],
})
export class CostsContainerComponent implements OnInit {
  selectedValue: string = 'SGD';
  paymentCurrencies: any[] = [];

  exchangeRatesData: ExchangeRates | undefined;

  constructor(
    private exchangeRatesService: ExchangeRatesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.exchangeRatesService.selectedValue$.subscribe((value) => {
      this.selectedValue = value;
    });

    this.exchangeRatesService.paymentCurrencies$.subscribe((currencies) => {
      this.paymentCurrencies = currencies;
    });

    this.exchangeRatesData = this.route.snapshot.data['exchangeRatesData'];
    console.log(this.exchangeRatesData);
  }
  //   oznacza, że komponent CostsContainerComponent zasubskrybował się do paymentCurrencies$, który jest obserwowalnym strumieniem danych dostarczanym przez usługę CostsService. Gdy nowe dane zostaną wysłane za pomocą next z BehaviorSubject w usłudze, ta subskrypcja (subskrypcja do paymentCurrencies$) zostanie powiadomiona i przekaże te nowe dane do komponentu.
  // Konkretnie oznacza to:
  // this.costsService.paymentCurrencies$ - To odnosi się do obserwowalnego strumienia danych dostarczanego przez usługę CostsService. W tym przypadku jest to strumień, który reprezentuje dane walut płatniczych.
  // .subscribe((currencies) => { ... }) - Ta metoda subscribe jest używana do zasubskrybowania się do obserwowalnego strumienia. Kiedy nowe dane zostaną wysłane do paymentCurrencies$, ta funkcja zostanie wywołana z nowymi danymi jako argumentem (currencies).
  // this.paymentCurrencies = currencies; - Po odebraniu nowych danych (currencies) w komponencie CostsContainerComponent, te dane zostaną przypisane do właściwości paymentCurrencies w komponencie. To umożliwia komponentowi dostęp i wykorzystanie tych danych w celu wyświetlenia ich w widoku lub ich dalszej obróbki.
  // W skrócie, linia kodu ta jest odpowiedzialna za reakcję na zmiany w danych walut płatniczych i aktualizację tych danych w komponencie CostsContainerComponent, aby odzwierciedlić zmiany w widoku.

  updateSelectedValue(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.exchangeRatesService.setSelectedValue(selectedValue);
  }

  // ngOnInit() {
  //   this.costsService.selectedValue$.subscribe((value) => {
  //     this.selectedValue = value;
  //   });

  //   this.paymentCurrencies = this.costsService.getPaymentCurrencies();
  //   console.log('oninit: ', this.paymentCurrencies);
  // }

  // selectedValue: string = 'SGD'; // Inicjalizuj wartość początkową
  // jsonUrl = '../../assets/exchange-rates.json'; // Ścieżka do twojego pliku JSON

  // jsonData: any; // Przechowuje dane JSON

  // // Tablica, do której zostaną przypisane dane z "paymentCurrencies"
  // paymentCurrencies: any[] = [];

  // constructor(private http: HttpClient, private costsService: CostsService) {}

  // ngOnInit() {
  //   // Pobierz dane JSON za pomocą HttpClient
  //   this.http.get(this.jsonUrl).subscribe((data: any) => {
  //     this.jsonData = data;
  //     // Wyodrębnij "paymentCurrencies" i przypisz do tablicy
  //     this.paymentCurrencies = data.paymentCurrencies;
  //     // console.log(this.paymentCurrencies);
  //     const toCurrencyArray = this.paymentCurrencies.map(
  //       (item: any) => item.toCurrency
  //     );
  //     console.log('tablica z walutami w dropdownie: ', toCurrencyArray);
  //   });
  // }

  // updateSelectedValue(event: Event) {
  //   const selectedValue = (event.target as HTMLSelectElement).value;
  //   this.costsService.setSelectedValue(selectedValue);
  // }
}
