"use strict";
var testing_1 = require('@angular/core/testing');
var angular2_offline_application_component_1 = require('../app/angular2-offline-application.component');
testing_1.beforeEachProviders(function () { return [angular2_offline_application_component_1.Angular2OfflineApplicationAppComponent]; });
testing_1.describe('App: Angular2OfflineApplication', function () {
    testing_1.it('should create the app', testing_1.inject([angular2_offline_application_component_1.Angular2OfflineApplicationAppComponent], function (app) {
        testing_1.expect(app).toBeTruthy();
    }));
});
//# sourceMappingURL=angular2-offline-application.component.spec.js.map