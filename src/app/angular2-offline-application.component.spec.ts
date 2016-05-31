import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { Angular2OfflineApplicationAppComponent } from '../app/angular2-offline-application.component';

beforeEachProviders(() => [Angular2OfflineApplicationAppComponent]);

describe('App: Angular2OfflineApplication', () => {
  it('should create the app',
      inject([Angular2OfflineApplicationAppComponent], (app: Angular2OfflineApplicationAppComponent) => {
    expect(app).toBeTruthy();
  }));
});
