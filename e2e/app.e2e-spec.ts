import { FcpdWechatPage } from './app.po';

describe('fcpd-wechat App', function() {
  let page: FcpdWechatPage;

  beforeEach(() => {
    page = new FcpdWechatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
