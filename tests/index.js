const { State, StateManager, Review } = require('../');
const MoinState = require('./src/MoinState');
const MoinMobileState = require('./src/MoinMobileState');
const { BlessedSampleState, CurrentSampleState } = require('./src/SampleState');
const PreSampleState = require('./src/PreSampleState');

const states = [
  MoinState,
  MoinMobileState,
  BlessedSampleState,
  CurrentSampleState,
];

const options = {
  puppeteer: {
    headless: false,
    slowMo: 100,
  },
};

const manager = new StateManager({ states, options });
const review = new Review({
  blessedPath: './build/blessed',
  currentPath: './build/current',
  resultPath: './build/result',
});

manager.run();
review.run();
