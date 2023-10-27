import { Component, OnInit } from '@angular/core';
import { CommentGroupService } from 'src/app/services/comment-group.service';
import { CostsService } from 'src/app/services/costs.service';

@Component({
  selector: 'app-second-single-cost',
  templateUrl: './second-single-cost.component.html',
  styleUrls: ['./second-single-cost.component.scss'],
})
export class SecondSingleCostComponent implements OnInit {
  defaultValue: number = 1000;
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
