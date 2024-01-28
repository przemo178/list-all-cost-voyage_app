import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  @Input() id: any;

  public commentForm: FormGroup = new FormGroup({
    commentType: new FormControl('default', Validators.required),
    commentText: new FormControl({ value: 'Type comment', disabled: true }, [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  ngOnInit(): void {
    // zmiana pola select wywołująca aktywacje/dezaktywację pola input z komentarzem
    const commentTypeControl = this.commentForm.get('commentType');
    const commentTextControl = this.commentForm.get('commentText');

    commentTypeControl.valueChanges.subscribe((value) => {
      if (['internal', 'external'].includes(value)) {
        commentTextControl.enable();
        commentTextControl.setValue('');
      } else {
        commentTextControl.disable();
        commentTextControl.setValue('Type comment');
      }
    });
  }

  addComment() {}
}
