const express = require('express');
const { State } = require('../../');
const PreSampleState = require('./PreMoinState');

class SampleState extends State {
  static get requires() {
    return [PreSampleState];
  }

  constructor(params) {
    super(params);

    this.name = '';
    this.path = '';
    this.server = null;
    this.port = 8088;
    this.page = null;
  }

  async init() {
    const app = express();
    app.use(express.static(`tests/samples/${ this.path }`));

    const page = await this.manager.browser.newPage();
    await page.setViewport({ width: 400, height: 400 });

    this.page = page;
    this.server = app.listen(this.port);
  }

  async capture(name) {
    const page = this.page;
    await page.goto(`http://localhost:${ this.port }/${ name }.html`);
    await page.screenshot({ path: `./build/${ this.path }/${ name }.png`, fullPage: true });
  }

  async exit() {
    this.server.close();

    await this.page.close();
  }

  run() {
    this.test('Start Sample Server', this.init.bind(this));
    this.test('Capture same.html', this.capture.bind(this, 'same'));
    this.test('Capture diff.html', this.capture.bind(this, 'diff'));
    this.test('Capture textdiff.html', this.capture.bind(this, 'textdiff'));
    this.test('Stop Sample Server', this.exit.bind(this));
  }
}

class BlessedSampleState extends SampleState {
  constructor(params) {
    super(params);

    this.name = 'Generate Blessed Samples';
    this.path = 'blessed';
    this.port = 8088;
  }
}

class CurrentSampleState extends SampleState {
  constructor(params) {
    super(params);

    this.name = 'Generate Current Samples';
    this.path = 'current';
    this.port = 8089;
  }
}

module.exports = {
  SampleState,
  BlessedSampleState,
  CurrentSampleState,
};
