import { Component } from '@angular/core';
import { CommentGroupService } from 'src/app/services/comment-group.service';

@Component({
  selector: 'app-second-single-cost',
  templateUrl: './second-single-cost.component.html',
  styleUrls: ['./second-single-cost.component.scss'],
})
export class SecondSingleCostComponent {
  defaultValue: number = 2000;
  inputDefaultValue = this.defaultValue.toFixed(2);
  placeholder = 'SGD';

  constructor(private commentGroupService: CommentGroupService) {}

  toggleCommentGroup() {
    this.commentGroupService.isCommentTwoGroupVisible =
      !this.commentGroupService.isCommentTwoGroupVisible;
  }
}
