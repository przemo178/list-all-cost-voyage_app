import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CostsService } from 'src/app/services/costs.service';

@Component({
  selector: 'app-costs-container',
  templateUrl: './costs-container.component.html',
  styleUrls: ['./costs-container.component.scss'],
})
export class CostsContainerComponent implements OnInit {
  selectedValue: string = 'SGD'; // Inicjalizuj wartość początkową
  jsonUrl = '../../assets/exchange-rates.json'; // Ścieżka do twojego pliku JSON

  jsonData: any; // Przechowuje dane JSON

  // Tablica, do której zostaną przypisane dane z "paymentCurrencies"
  paymentCurrencies: any[] = [];

  constructor(private http: HttpClient, private costsService: CostsService) {}

  ngOnInit() {
    // Pobierz dane JSON za pomocą HttpClient
    this.http.get(this.jsonUrl).subscribe((data: any) => {
      this.jsonData = data;
      // Wyodrębnij "paymentCurrencies" i przypisz do tablicy
      this.paymentCurrencies = data.paymentCurrencies;
      // console.log(this.paymentCurrencies);
      const toCurrencyArray = this.paymentCurrencies.map(
        (item: any) => item.toCurrency
      );
      console.log('tablica z walutami w dropdownie: ', toCurrencyArray);
    });
  }

  updateSelectedValue(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.costsService.setSelectedValue(selectedValue);
  }
}
