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
var ds_spinner_1 = require('../ds-spinner');
var DsListComponent = (function () {
    function DsListComponent() {
    }
    DsListComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input('listItems'), 
        __metadata('design:type', Array)
    ], DsListComponent.prototype, "listItems", void 0);
    DsListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ds-list',
            templateUrl: 'ds-list.component.html',
            styleUrls: ['ds-list.component.css'],
            directives: [ds_spinner_1.DsSpinnerComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], DsListComponent);
    return DsListComponent;
}());
exports.DsListComponent = DsListComponent;
//# sourceMappingURL=ds-list.component.js.map