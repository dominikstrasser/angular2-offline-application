import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ds-input',
  templateUrl: 'ds-input.component.html',
  styleUrls: ['ds-input.component.css']
})
export class DsInputComponent implements OnInit {
  
  @Output('onEnter') onEnter = new EventEmitter();
  private message: string
  constructor() {}

  ngOnInit() {
  }
  
  onKeyUp (_event:KeyboardEvent, message) {
    if(_event.keyCode === 13 && message && message.length > 0) {
      this.onEnter.next({message});
      this.message = null;
    }
  }

}
