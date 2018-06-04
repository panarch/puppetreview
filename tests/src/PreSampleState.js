const assert = require('assert');
const { State } = require('../../');

class PreSampleState extends State {
  constructor(params) {
    super(params);

    this.name = 'Pre Sample Test';
  }

  test1() {
    assert.equal([1,2,3].indexOf(4), -1);
  }

  test2() {
    assert.equal('Hello', 'Hello');
  }

  run() {
    this.test('Pre Sample Test Case 1', this.test1);
    this.test('Pre Sample Test Case 2', this.test2);
  }
}

module.exports = PreSampleState;
