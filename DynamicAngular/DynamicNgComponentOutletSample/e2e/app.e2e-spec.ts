import { DynamicComponentOutletSamplePage } from './app.po';

describe('dynamic-component-outlet-sample App', () => {
  let page: DynamicComponentOutletSamplePage;

  beforeEach(() => {
    page = new DynamicComponentOutletSamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
