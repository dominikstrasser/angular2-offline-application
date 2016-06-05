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
var DsLoginComponent = (function () {
    function DsLoginComponent() {
        this.onLogin = new core_1.EventEmitter();
    }
    DsLoginComponent.prototype.ngOnInit = function () {
    };
    DsLoginComponent.prototype.performLogout = function () {
        firebase.auth().signOut().then(function () {
            console.log('loggedOut');
        }, function (error) {
            console.log(error);
        });
    };
    DsLoginComponent.prototype.performLogin = function () {
        var _this = this;
        var provider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            _this.onLogin.next(result);
        }).catch(function (error) {
            console.log(error);
            _this.errorMessage = error.message;
        });
    };
    __decorate([
        core_1.Output('onLogin'), 
        __metadata('design:type', Object)
    ], DsLoginComponent.prototype, "onLogin", void 0);
    __decorate([
        core_1.Input('isLoggedIn'), 
        __metadata('design:type', Object)
    ], DsLoginComponent.prototype, "isLoggedIn", void 0);
    DsLoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ds-login',
            templateUrl: 'ds-login.component.html',
            styleUrls: ['ds-login.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], DsLoginComponent);
    return DsLoginComponent;
}());
exports.DsLoginComponent = DsLoginComponent;
//# sourceMappingURL=ds-login.component.js.map