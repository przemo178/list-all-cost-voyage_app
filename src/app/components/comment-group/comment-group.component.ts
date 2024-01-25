import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-group',
  templateUrl: './comment-group.component.html',
  styleUrls: ['./comment-group.component.scss'],
})
export class CommentGroupComponent implements OnInit {
  @Input() comments: any[] = [];

  ngOnInit(): void {}
}
