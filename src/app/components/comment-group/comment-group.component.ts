import { Component } from '@angular/core';
import { CommentGroupService } from 'src/app/services/comment-group.service';

@Component({
  selector: 'app-comment-group',
  templateUrl: './comment-group.component.html',
  styleUrls: ['./comment-group.component.scss'],
})
export class CommentGroupComponent {
  constructor(public commentGroupService: CommentGroupService) {}
}
