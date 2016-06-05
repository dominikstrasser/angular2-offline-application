import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

declare var firebase;

@Component({
  moduleId: module.id,
  selector: 'ds-login',
  templateUrl: 'ds-login.component.html',
  styleUrls: ['ds-login.component.css']
})
export class DsLoginComponent implements OnInit {

  @Output('onLogin') onLogin = new EventEmitter();
  @Input('isLoggedIn') isLoggedIn;
  
  private errorMessage;
  constructor() { }


  ngOnInit() {
    
  }


  performLogout() {
    firebase.auth().signOut().then(function () {
      console.log('loggedOut')
    }, function (error) {
      console.log(error)
    });
  }


  performLogin() {
    let provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      this.onLogin.next(result);
    }).catch((error) => {
      console.log(error);
      this.errorMessage = error.message;
    });
  }

}
