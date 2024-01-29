import { Component, Input, OnInit } from '@angular/core';
import { CostsService } from 'src/app/services/costs.service';

@Component({
  selector: 'app-comment-group',
  templateUrl: './comment-group.component.html',
  styleUrls: ['./comment-group.component.scss'],
})
export class CommentGroupComponent implements OnInit {
  @Input() comments: any[] = [];

  recivedComment: any;

  constructor(private costsService: CostsService) {}

  ngOnInit(): void {
    this.costsService.getComment().subscribe((comment) => {
      this.recivedComment = comment;
    });
  }
}
