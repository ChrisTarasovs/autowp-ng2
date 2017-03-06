import { browser, element, by } from 'protractor';

export class DragNdropNg2.4.9Page {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
