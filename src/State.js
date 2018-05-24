const assert = require('assert');
const StateManager = require('./StateManager');

class State {
  static get requires() { return []; }

  constructor({ manager }) {
    this.manager = manager;
    this.name = 'Test';
  }

  test(name, handler) {
    it (name, async () => {
      await handler.call(this);
    });
  }

  async run() {
    this.test('Add test case here', () => {
      assert(true);
    });

    this.test('Add test case here 2', async () => {
      assert(true);
    });

    it('111 Add test case here', (done) => {

      done();
    });

    it('222 Add test case here', (done) => {

      done();
    })
  }

  async runTests() {
    await new Promise((resolve) => {
      describe(this.name, async () => {
        await this.run();

        resolve();
      });
    })
  }
}

module.exports = State;
