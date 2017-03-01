import { Angular2ComplexExample01Page } from './app.po';

describe('angular2-complex-example01 App', function() {
  let page: Angular2ComplexExample01Page;

  beforeEach(() => {
    page = new Angular2ComplexExample01Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
