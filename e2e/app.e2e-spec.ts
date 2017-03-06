import { DragNdropNg2.4.9Page } from './app.po';

describe('drag-ndrop-ng2.4.9 App', () => {
  let page: DragNdropNg2.4.9Page;

  beforeEach(() => {
    page = new DragNdropNg2.4.9Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
