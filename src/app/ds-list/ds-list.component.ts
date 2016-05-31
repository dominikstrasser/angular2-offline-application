import { Component, OnInit, Input } from '@angular/core';
import { IListItem } from '../';
import { DsSpinnerComponent } from '../ds-spinner';

@Component({
  moduleId: module.id,
  selector: 'ds-list',
  templateUrl: 'ds-list.component.html',
  styleUrls: ['ds-list.component.css'],
  directives: [DsSpinnerComponent]
})
export class DsListComponent implements OnInit {

  @Input('listItems') listItems: IListItem[];
  
  constructor() {}

  ngOnInit() {
  }

}
