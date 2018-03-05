import { MidasHomePage } from './app.po';

describe('midas-home App', () => {
  let page: MidasHomePage;

  beforeEach(() => {
    page = new MidasHomePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
