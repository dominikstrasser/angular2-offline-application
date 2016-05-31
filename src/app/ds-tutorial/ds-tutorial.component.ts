import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import * as marked from 'marked' 

@Component({
  moduleId: module.id,
  selector: 'ds-tutorial',
  templateUrl: 'ds-tutorial.component.html',
  styleUrls: ['ds-tutorial.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DsTutorialComponent implements OnInit {
  
  public text: string;
  
  constructor(private http: Http) {}

  ngOnInit() {
    this.http.get('tutorial.md').subscribe(data => {
      this.text = marked.parse(data.text());
    })
  }

}
