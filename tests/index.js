const assert = require('assert');
const { State, StateManager } = require('../');

class SampleState extends State {
  static get requires() {
    return [State];
  }

  constructor(params) {
    super(params);

    this.name = 'Sample Test';
  }

  test1() {
    assert.equal([1,2,3].indexOf(4), -1);
  }

  test2() {
    assert.equal('Hello', 'Hello');
  }

  async run() {
    this.test('Sample Test Case 1', this.test1);
    this.test('Sample Test Case 2', this.test2);
  }
}

class BrowserSampleState extends State {
  constructor(params) {
    super(params);

    this.name = 'Browser Desktop Sample Test';
    this.page = null;
  }

  async open() {
    const page = await this.manager.browser.newPage();
    await page.setViewport({ width: 1300, height: 800 });
    await page.goto('https://themoin.com');
    await page.screenshot({ path: './build/landing.png', fullPage: true });

    this.page = page;
  }

  async gotoLogin() {
    const page = this.page;
    await page.goto('https://themoin.com/login');
    await page.screenshot({ path: './build/login.png', fullPage: true });
  }

  async gotoCompany() {
    const page = this.page;
    await page.goto('https://themoin.com/company');
    await page.screenshot({ path: './build/company.png', fullPage: true });
  }

  async gotoTerms() {
    const page = this.page;
    await page.goto('https://themoin.com/terms');
    await page.screenshot({ path: './build/terms2.png', fullPage: true });
  }

  async openUrl(url, filename) {
    const page = this.page;
    await page.goto(url);
    await page.waitFor(300);
    await page.screenshot({ path: `./build/${ filename }.png`, fullPage: true });
  }

  async run() {
    this.test('Open https://themoin.com', this.open);
    this.test('Open Login', this.gotoLogin);
    this.test('Open Company', this.gotoCompany);
    this.test('Open SignUp', async () => { await this.openUrl('https://themoin.com/signup', 'signup') });
    this.test('Open Info', async () => { await this.openUrl('https://themoin.com/info', 'info') });
    this.test('Open Terms', async () => { await this.openUrl('https://themoin.com/terms', 'terms') });
    this.test('Open Privacy', async () => { await this.openUrl('https://themoin.com/privacy', 'privacy') });
    this.test('Open Notice', async () => { await this.openUrl('https://themoin.com/notice', 'notice') });

    this.test('Close', async () => { await this.page.close() });
  }
}

class BrowserMobileSampleState extends State {
  constructor(params) {
    super(params);

    this.name = 'Browser Mobile Sample Test';
    this.page = null;
  }

  async openUrl(url, filename) {
    if (!this.page) {
      const page = await this.manager.browser.newPage();
      await page.setViewport({ width: 400, height: 800 });
      this.page = page;
    }

    const page = this.page;
    await page.goto(url);
    await page.waitFor(300);
    await page.screenshot({ path: `./build/${ filename }.png`, fullPage: true });
  }

  async run() {
    this.test('Open Company', async () => { await this.openUrl('https://themoin.com/company', 'company_m') });
    this.test('Open Info', async () => { await this.openUrl('https://themoin.com/info', 'info_m') });
    this.test('Open Terms', async () => { await this.openUrl('https://themoin.com/terms', 'terms_m') });
    this.test('Open Privacy', async () => { await this.openUrl('https://themoin.com/privacy', 'privacy_m') });
    this.test('Open Notice', async () => { await this.openUrl('https://themoin.com/notice', 'notice_m') });

    this.test('Close', async () => { await this.page.close() });
  }
}

const states = [
  SampleState,
  BrowserSampleState,
  BrowserMobileSampleState,
];

const options = {
  puppeteer: {
    headless: false,
    slowMo: 100,
  },
};

const manager = new StateManager({ states, options });

manager.run();
