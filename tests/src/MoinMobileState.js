const MoinState = require('./MoinState');

class MoinMobileState extends MoinState {
  constructor (params) {
    super(params);

    this.name = 'Browser Mobile Sample Test';
    this.page = null;

    this.viewport = { width: 400, height: 800 };
    this.postfix = '_mobile';
  }
}

module.exports = MoinMobileState;
