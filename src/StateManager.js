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
    let browser;

    describe('StateManager', () => {
      it('Launch Puppeteer', async () => {
        this.browser = await puppeteer.launch(this.options.puppeteer);
      });

      for (const State of this.states) {
        const state = new State({ manager: this });
        state.runTests();
      }

      after(() => {
        this.browser.close();
      });
    });
  }
}

module.exports = StateManager;
