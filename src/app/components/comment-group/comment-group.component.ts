import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/costs.model';
import { CostsService } from 'src/app/services/costs.service';

@Component({
  selector: 'app-comment-group',
  templateUrl: './comment-group.component.html',
  styleUrls: ['./comment-group.component.scss'],
})
export class CommentGroupComponent implements OnInit {
  @Input() comments: Comment[] = [];

  recivedComment: Partial<Comment>;

  constructor(private costsService: CostsService) {}

  ngOnInit(): void {
    this.costsService.getComment().subscribe((comment) => {
      this.recivedComment = comment;
      console.log('comment z COMMENT-GROUP: ', comment);
    });
  }
}
