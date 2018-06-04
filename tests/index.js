const assert = require('assert');
const { State, StateManager } = require('../');
const MoinState = require('./src/MoinState');
const MoinMobileState = require('./src/MoinMobileState');
const SampleState = require('./src/SampleState');

const states = [
  MoinState,
  MoinMobileState,
  SampleState,
];

const options = {
  puppeteer: {
    headless: false,
    slowMo: 100,
  },
};

const manager = new StateManager({ states, options });

manager.run();
