const assert = require('assert');
const { State } = require('../../');

class PreMoinState extends State {
  constructor(params) {
    super(params);

    this.name = 'Pre Moin Test';
  }

  test1() {
    assert.equal('Hello', 'Hello');
  }

  async run() {
    this.test('Pre Moin', this.test1);
  }
}

module.exports = PreMoinState;
