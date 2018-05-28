const puppeteer = require('puppeteer');
const assert = require('assert');

class StateManager {
  constructor({ states, options }) {
    this.states = states;
    this.options = options;
    this.browser = null;

    this.buildStates(states);
  }

  buildStates() {
    const states = [];
    for (const State of this.states) {
      for (const PrevState of State.requires) {
        if (this.states.includes(PrevState)) continue;

        states.push(PrevState);
      }

      states.push(State);
    }

    this.states = states;
  }

  run() {
    const manager = this;

    describe('StateManager', function () {
      this.timeout(10000);

      it('Launch Puppeteer', async () => {
        manager.browser = await puppeteer.launch(manager.options.puppeteer);
      });

      for (const State of manager.states) {
        const state = new State({ manager });
        state.runTests();
      }

      after(() => {
        manager.browser.close();
      });
    });
  }
}

module.exports = StateManager;
