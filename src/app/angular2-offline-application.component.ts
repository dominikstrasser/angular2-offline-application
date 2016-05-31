import { Component } from '@angular/core';
import { DsInputComponent } from './ds-input';
import { DsListComponent } from './ds-list';

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
  directives: [DsInputComponent, DsListComponent]
})
export class Angular2OfflineApplicationAppComponent {

  public listItems: IListItem[] = [];
  public rawData: any = {};
  public messageRef;
  public connectionRef;
  public isOnline = true;
  public isPersistingData = false;
  public gettingPersistingData = false;
  constructor() {

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
    console.log('initDisconnectListener');
    firebase.database().ref('.info/connected').on('value', (connectedSnap) => {
      console.log(connectedSnap.val());
      if (connectedSnap.val() === true) {
        this.isOnline = true;
      } else {
        this.isOnline = false;
        if (!this.listItems.length) setTimeout(() => this.getPersistedData(), 1000);
      }
    });
  }


  initChildAddedListener() {
    this.messageRef.on('child_added', (snapshot) => {
      console.log('child_added');
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
    if(this.isOnline) return;
    console.log('getPersistedData');
    this.listItems = JSON.parse(localStorage.getItem('listItems')) || [];
  }

  sendMessage(event) {
    let item: IListItem = {
      message: event.message,
    }
    this.messageRef.push(item);
  }
}
