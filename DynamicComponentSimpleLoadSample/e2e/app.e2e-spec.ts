import { DynamicComponentLoadSamplePage } from './app.po';

describe('dynamic-component-load-sample App', () => {
  let page: DynamicComponentLoadSamplePage;

  beforeEach(() => {
    page = new DynamicComponentLoadSamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
