import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { DsInputComponent } from './ds-input';
import { DsListComponent } from './ds-list';
import { DsTutorialComponent } from './ds-tutorial';

import 'vendor/firebase/firebase.js';
declare var firebase;

export interface IListItem {
  message: string,
}


@Component({
  moduleId: module.id,
  selector: 'angular2-offline-application-app',
  templateUrl: 'angular2-offline-application.component.html',
  styleUrls: ['angular2-offline-application.component.css'],
  directives: [DsInputComponent, DsListComponent, DsTutorialComponent],
  providers: [HTTP_PROVIDERS]
})
export class Angular2OfflineApplicationAppComponent {

  public listItems: IListItem[] = [];
  public rawData: any = {};
  public messageRef;
  public connectionRef;
  public isOnline = true;
  public isPersistingData = false;
  public isTutorialHidden = true;
  
  constructor() {}

  ngOnInit() {
    var config = {
      apiKey: "AIzaSyBmxmlZUo_cvikhAgA0GLfD0OOkWM1IJxw",
      authDomain: "offline-application-41a3e.firebaseapp.com",
      databaseURL: "https://offline-application-41a3e.firebaseio.com",
      storageBucket: "offline-application-41a3e.appspot.com",
    };
    firebase.initializeApp(config);

    this.messageRef = firebase.database().ref('/messages');

    this.initDisconnectListener()
    this.initChildAddedListener();
  }

  initDisconnectListener() {
    firebase.database().ref('.info/connected').on('value', (connectedSnap) => {
      if (connectedSnap.val() === true) {
        this.isOnline = true;
      } else {
        this.isOnline = false;
        if (!this.listItems.length) setTimeout(() => this.getPersistedData(), 2000);
      }
    });
  }

  toggleTutorial() {
    this.isTutorialHidden = !this.isTutorialHidden;
  }

  initChildAddedListener() {
    this.messageRef.on('child_added', (snapshot) => {
      this.listItems.unshift(snapshot.val());
      if (this.isPersistingData) return;
      setTimeout(() => this.persistData(), 1000);
      this.isPersistingData = true;
    });
  }


  persistData() {
    localStorage.setItem('listItems', JSON.stringify(this.listItems));
    this.isPersistingData = false;
  }


  getPersistedData() {
    if (this.isOnline) return;
    this.listItems = JSON.parse(localStorage.getItem('listItems')) || [];
  }


  sendMessage(item: IListItem) {
    this.messageRef.push(item);
  }
}
