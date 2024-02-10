import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AllCostsData, Comment } from '../models/costs.model';

@Injectable({ providedIn: 'root' })
export class CostsService {
  private jsonUrl = '../assets/costs.json';

  // tworzę sobie subject, aby póżniej subskrybować dane w komponencie comment-group - używam Partial<Comment> bo nie emituje tu pełnego modelu Comment
  private commentSubject = new Subject<Partial<Comment>>();

  constructor(private http: HttpClient) {}

  // pobieranie pełnych danych COSTS z JSONa
  getCostsData(): Observable<AllCostsData> {
    return this.http.get<AllCostsData>(this.jsonUrl);
  }

  // wysyłanie komentarza do comment-group - wykorzytsując next wysyłamy aktualny komentarz do wszystkich obserwatorów
  sendComment(comment: Partial<Comment>) {
    this.commentSubject.next(comment);
  }

  // pobieranie komentarza - zwraca obserwator pochodzący z commentSubject
  getComment() {
    return this.commentSubject.asObservable();
  }

  // funkcja sumująca wartości z inputów single costów
  calculateScreenedTotalSum(inputsArray: number[]): number {
    return inputsArray.reduce((sum, singleCost) => sum + singleCost, 0);
  }
}
