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
var ds_input_1 = require('./ds-input');
var ds_list_1 = require('./ds-list');
require('vendor/firebase/firebase.js');
var Angular2OfflineApplicationAppComponent = (function () {
    function Angular2OfflineApplicationAppComponent() {
        this.listItems = [];
        this.rawData = {};
        this.isOnline = true;
        this.isPersistingData = false;
        this.gettingPersistingData = false;
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
    }
    Angular2OfflineApplicationAppComponent.prototype.initDisconnectListener = function () {
        var _this = this;
        console.log('initDisconnectListener');
        firebase.database().ref('.info/connected').on('value', function (connectedSnap) {
            console.log(connectedSnap.val());
            if (connectedSnap.val() === true) {
                _this.isOnline = true;
            }
            else {
                _this.isOnline = false;
                if (!_this.listItems.length)
                    setTimeout(function () { return _this.getPersistedData(); }, 1000);
            }
        });
    };
    Angular2OfflineApplicationAppComponent.prototype.initChildAddedListener = function () {
        var _this = this;
        this.messageRef.on('child_added', function (snapshot) {
            console.log('child_added');
            _this.listItems.unshift(snapshot.val());
            if (_this.isPersistingData)
                return;
            setTimeout(function () { return _this.persistData(); }, 1000);
            _this.isPersistingData = true;
        });
    };
    Angular2OfflineApplicationAppComponent.prototype.persistData = function () {
        localStorage.setItem('listItems', JSON.stringify(this.listItems));
        this.isPersistingData = false;
    };
    Angular2OfflineApplicationAppComponent.prototype.getPersistedData = function () {
        if (this.isOnline)
            return;
        console.log('getPersistedData');
        this.listItems = JSON.parse(localStorage.getItem('listItems')) || [];
    };
    Angular2OfflineApplicationAppComponent.prototype.sendMessage = function (event) {
        var item = {
            message: event.message,
        };
        this.messageRef.push(item);
    };
    Angular2OfflineApplicationAppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'angular2-offline-application-app',
            templateUrl: 'angular2-offline-application.component.html',
            styleUrls: ['angular2-offline-application.component.css'],
            directives: [ds_input_1.DsInputComponent, ds_list_1.DsListComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], Angular2OfflineApplicationAppComponent);
    return Angular2OfflineApplicationAppComponent;
}());
exports.Angular2OfflineApplicationAppComponent = Angular2OfflineApplicationAppComponent;
//# sourceMappingURL=angular2-offline-application.component.js.map