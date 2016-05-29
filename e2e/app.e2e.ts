import { Angular2OfflineApplicationPage } from './app.po';

describe('angular2-offline-application App', function() {
  let page: Angular2OfflineApplicationPage;

  beforeEach(() => {
    page = new Angular2OfflineApplicationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('angular2-offline-application works!');
  });
});
