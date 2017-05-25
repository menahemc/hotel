import { HcollectionPage } from './app.po';

describe('hcollection App', () => {
  let page: HcollectionPage;

  beforeEach(() => {
    page = new HcollectionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
