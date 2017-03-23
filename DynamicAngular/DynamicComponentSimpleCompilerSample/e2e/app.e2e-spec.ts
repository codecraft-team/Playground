import { DynamicComponentSimpleCompilerSamplePage } from './app.po';

describe('dynamic-component-simple-compiler-sample App', () => {
  let page: DynamicComponentSimpleCompilerSamplePage;

  beforeEach(() => {
    page = new DynamicComponentSimpleCompilerSamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
