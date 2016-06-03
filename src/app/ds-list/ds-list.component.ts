import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output('onRemove') onRemove = new EventEmitter();
  
  constructor() {}

  removeItem(item) {
    this.onRemove.next(item);
  }

  ngOnInit() {
    
  }

}
