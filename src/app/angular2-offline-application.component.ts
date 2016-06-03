import { Component, ViewEncapsulation } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { DsInputComponent } from './ds-input';
import { DsListComponent } from './ds-list';
import { DsTutorialComponent } from './ds-tutorial';
import { DsLoginComponent } from './ds-login';
import 'vendor/firebase/firebase.js';
declare var firebase;

export interface IListItem {
  message: string,
  key?: string
}


@Component({
  moduleId: module.id,
  selector: 'angular2-offline-application-app',
  templateUrl: 'angular2-offline-application.component.html',
  styleUrls: ['angular2-offline-application.component.css'],
  directives: [DsInputComponent, DsListComponent, DsTutorialComponent, DsLoginComponent],
  providers: [HTTP_PROVIDERS],
  encapsulation: ViewEncapsulation.None
})
export class Angular2OfflineApplicationAppComponent {

  public listItems: IListItem[] = [];
  public rawData: any = {};
  public messageRef;
  public connectionRef;
  public isOnline = true;
  public isPersistingData = false;
  public isTutorialHidden = true;
  public isLoggedIn = false;

  constructor() { }

  ngOnInit() {
    var config = {
      apiKey: "AIzaSyBmxmlZUo_cvikhAgA0GLfD0OOkWM1IJxw",
      authDomain: "offline-application-41a3e.firebaseapp.com",
      databaseURL: "https://offline-application-41a3e.firebaseio.com",
      storageBucket: "offline-application-41a3e.appspot.com",
    };
    firebase.initializeApp(config);

    this.messageRef = firebase.database().ref('/messages-auth');

    this.initDisconnectListener()
    this.initChildAddedListener();
    this.initChildRemovedListener();
    this.initAuthListener();
  }

  initAuthListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
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

  onLogin(result) {
    console.log(result);
    var credential = firebase.auth.GithubAuthProvider.credential(result.credential.accessToken);
    firebase.auth().signInWithCredential(credential).catch(function (error) {
      console.log(error);
    });
  }

  onRemove(item) {
    this.messageRef.child(item.key).remove();
  }

  toggleTutorial() {
    this.isTutorialHidden = !this.isTutorialHidden;
  }

  initChildAddedListener() {
    this.messageRef.on('child_added', (snapshot) => {
      let item: IListItem = {
        message: snapshot.val().message,
        key: snapshot.key
      }
      this.listItems.unshift(item);
      if (this.isPersistingData) return;
      setTimeout(() => this.persistData(), 1000);
      this.isPersistingData = true;
    });
  }

  initChildRemovedListener() {
    this.messageRef.on('child_removed', (snapshot) => {
      let item: IListItem = {
        message: snapshot.val().message,
        key: snapshot.key
      }
      let index = this.getIndexForKey(item.key);
      this.listItems.splice(index, 1);
      if (this.isPersistingData) return;
      setTimeout(() => this.persistData(), 1000);
      this.isPersistingData = true;
    });
  }

  getIndexForKey(_key) {
    for (let i = 0; i < this.listItems.length; i++) {
      if(_key == this.listItems[i].key) return i
    }
    return -1;
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
    this.messageRef.push(item.message);
  }
}
