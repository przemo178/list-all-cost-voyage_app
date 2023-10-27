import { Component, OnInit } from '@angular/core';
import { CommentGroupService } from 'src/app/services/comment-group.service';
import { CostsService } from 'src/app/services/costs.service';

@Component({
  selector: 'app-single-cost',
  templateUrl: './single-cost.component.html',
  styleUrls: ['./single-cost.component.scss'],
})
export class SingleCostComponent implements OnInit {
  defaultValue: number = 2000;
  inputDefaultValue = this.defaultValue.toFixed(2);
  placeholder = 'SGD';
  selectedValue: string = '';

  constructor(
    private commentGroupService: CommentGroupService,
    private costsService: CostsService
  ) {}

  ngOnInit(): void {
    this.subscribeToSelectedValue();
    console.log(this.selectedValue);
  }

  toggleCommentGroup() {
    this.commentGroupService.isCommentGroupVisible =
      !this.commentGroupService.isCommentGroupVisible;
  }

  subscribeToSelectedValue() {
    this.costsService.selectedValue$.subscribe((value) => {
      this.selectedValue = value;
    });
  }
}
