"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var ds_input_1 = require('./ds-input');
var ds_list_1 = require('./ds-list');
var ds_tutorial_1 = require('./ds-tutorial');
var ds_login_1 = require('./ds-login');
require('vendor/firebase/firebase.js');
var Angular2OfflineApplicationAppComponent = (function () {
    function Angular2OfflineApplicationAppComponent() {
        this.listItems = [];
        this.rawData = {};
        this.isOnline = true;
        this.isPersistingData = false;
        this.isTutorialHidden = true;
        this.isLoggedIn = false;
    }
    Angular2OfflineApplicationAppComponent.prototype.ngOnInit = function () {
        var config = {
            apiKey: "AIzaSyBmxmlZUo_cvikhAgA0GLfD0OOkWM1IJxw",
            authDomain: "offline-application-41a3e.firebaseapp.com",
            databaseURL: "https://offline-application-41a3e.firebaseio.com",
            storageBucket: "offline-application-41a3e.appspot.com",
        };
        firebase.initializeApp(config);
        this.messageRef = firebase.database().ref('/messages');
        this.initDisconnectListener();
        this.initChildAddedListener();
        this.initChildRemovedListener();
        this.initAuthListener();
    };
    Angular2OfflineApplicationAppComponent.prototype.initAuthListener = function () {
        var _this = this;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                _this.isLoggedIn = true;
            }
            else {
                _this.isLoggedIn = false;
            }
        });
    };
    Angular2OfflineApplicationAppComponent.prototype.initDisconnectListener = function () {
        var _this = this;
        firebase.database().ref('.info/connected').on('value', function (connectedSnap) {
            if (connectedSnap.val() === true) {
                _this.isOnline = true;
            }
            else {
                _this.isOnline = false;
                if (!_this.listItems.length)
                    setTimeout(function () { return _this.getPersistedData(); }, 2000);
            }
        });
    };
    Angular2OfflineApplicationAppComponent.prototype.onLogin = function (result) {
        var credential = firebase.auth.GithubAuthProvider.credential(result.credential.accessToken);
        firebase.auth().signInWithCredential(credential).catch(function (error) {
            console.log(error);
        });
    };
    Angular2OfflineApplicationAppComponent.prototype.onRemove = function (item) {
        this.messageRef.child(item.key).remove();
    };
    Angular2OfflineApplicationAppComponent.prototype.toggleTutorial = function () {
        this.isTutorialHidden = !this.isTutorialHidden;
    };
    Angular2OfflineApplicationAppComponent.prototype.initChildAddedListener = function () {
        var _this = this;
        this.messageRef.on('child_added', function (snapshot) {
            var item = {
                message: snapshot.val().message,
                name: snapshot.val().name,
                key: snapshot.key
            };
            _this.listItems.unshift(item);
            if (_this.isPersistingData)
                return;
            setTimeout(function () { return _this.persistData(); }, 1000);
            _this.isPersistingData = true;
        });
    };
    Angular2OfflineApplicationAppComponent.prototype.initChildRemovedListener = function () {
        var _this = this;
        this.messageRef.on('child_removed', function (snapshot) {
            var item = {
                key: snapshot.key
            };
            var index = _this.getIndexForKey(item.key);
            _this.listItems.splice(index, 1);
            if (_this.isPersistingData)
                return;
            setTimeout(function () { return _this.persistData(); }, 1000);
            _this.isPersistingData = true;
        });
    };
    Angular2OfflineApplicationAppComponent.prototype.getIndexForKey = function (_key) {
        for (var i = 0; i < this.listItems.length; i++) {
            if (_key == this.listItems[i].key)
                return i;
        }
        return -1;
    };
    Angular2OfflineApplicationAppComponent.prototype.persistData = function () {
        localStorage.setItem('listItems', JSON.stringify(this.listItems));
        this.isPersistingData = false;
    };
    Angular2OfflineApplicationAppComponent.prototype.getPersistedData = function () {
        if (this.isOnline)
            return;
        this.listItems = JSON.parse(localStorage.getItem('listItems')) || [];
    };
    Angular2OfflineApplicationAppComponent.prototype.sendMessage = function (item) {
        item.name = firebase.auth().currentUser.displayName;
        this.messageRef.push(item);
    };
    Angular2OfflineApplicationAppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'angular2-offline-application-app',
            templateUrl: 'angular2-offline-application.component.html',
            styleUrls: ['angular2-offline-application.component.css'],
            directives: [ds_input_1.DsInputComponent, ds_list_1.DsListComponent, ds_tutorial_1.DsTutorialComponent, ds_login_1.DsLoginComponent],
            providers: [http_1.HTTP_PROVIDERS],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], Angular2OfflineApplicationAppComponent);
    return Angular2OfflineApplicationAppComponent;
}());
exports.Angular2OfflineApplicationAppComponent = Angular2OfflineApplicationAppComponent;
//# sourceMappingURL=angular2-offline-application.component.js.map