import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent {
  // inputEnabled: boolean = false; // Zmienna do sterowania dostępności pola input
  // enableInput(event: any) {
  //   const selectedValue = event.target.value;
  //   this.inputEnabled = selectedValue === 'active';
  // }
  // podejście drugie
  @Input() id: any;
}
