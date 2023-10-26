import { Component } from '@angular/core';
import { CommentGroupService } from 'src/app/services/comment-group.service';

@Component({
  selector: 'app-second-comment-group',
  templateUrl: './second-comment-group.component.html',
  styleUrls: ['./second-comment-group.component.scss'],
})
export class SecondCommentGroupComponent {
  constructor(public commentGroupService: CommentGroupService) {}
}
