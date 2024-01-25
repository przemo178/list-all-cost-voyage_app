import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cost-group',
  templateUrl: './cost-group.component.html',
  styleUrls: ['./cost-group.component.scss'],
})
export class CostGroupComponent implements OnInit {
  @Input() costGroup: any;

  ngOnInit(): void {}
}
