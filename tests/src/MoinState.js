const { State } = require('../../');
const PreMoinState = require('./PreMoinState');

class MoinState extends State {
  static get requires() {
    return [PreMoinState];
  }

  constructor(params) {
    super(params);

    this.path = './build/moin';
    this.name = 'Browser Desktop Sample Test';
    this.page = null;

    this.viewport = { width: 1300, height: 800 };
    this.postfix = '';
  }

  async open() {
    const page = await this.manager.browser.newPage();
    await page.setViewport(this.viewport);
    await page.goto('https://themoin.com');
    await page.screenshot({ path: `${ this.path }/landing${ this.postfix }.png`, fullPage: true });

    this.page = page;
  }

  async openUrl(url, fullPage = true) {
    const page = this.page;
    await page.goto(`https://themoin.com/${ url }`);
    await page.waitFor(300);
    await page.screenshot({ path: `${ this.path }/${ url }${ this.postfix }.png`, fullPage });
  }

  async run() {
    this.test('Open https://themoin.com', this.open);
    this.test('Open Login', this.openUrl.bind(this, 'login'));
    this.test('Open Company', this.openUrl.bind(this, 'company'));
    this.test('Open SignUp', this.openUrl.bind(this, 'signup'));
    this.test('Open Info', this.openUrl.bind(this, 'info'));
    this.test('Open Terms', this.openUrl.bind(this, 'temrs', false));
    this.test('Open Privacy', this.openUrl.bind(this, 'privacy', false));
    this.test('Open Notice', this.openUrl.bind(this, 'notice', false));

    this.test('Close', async () => { await this.page.close() });
  }
}

module.exports = MoinState;
