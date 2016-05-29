export class Angular2OfflineApplicationPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('angular2-offline-application-app h1')).getText();
  }
}
