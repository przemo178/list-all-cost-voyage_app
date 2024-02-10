import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.scss'],
})
export class SingleCommentComponent implements OnInit {
  @Input() singleComment: any;

  ngOnInit(): void {}
}
