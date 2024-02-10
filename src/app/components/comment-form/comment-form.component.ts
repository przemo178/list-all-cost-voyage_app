import { Comment } from 'src/app/models/costs.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CostsService } from 'src/app/services/costs.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  @Input() id: any;

  constructor(private costsService: CostsService) {}

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

  // dodawanie komentarzy do comment-group
  addComment() {
    console.log(this.commentForm);

    if (this.commentForm.valid) {
      const comment: Partial<Comment> = {
        type: this.commentForm.value.commentType,
        comment: this.commentForm.value.commentText,
      };

      this.costsService.sendComment(comment);
    }
  }
}
