const assert = require('assert');
const app = require('../../src/app');

describe('\'incomes\' service', () => {
  it('registered the service', () => {
    const service = app.service('incomes');

    assert.ok(service, 'Registered the service (incomes)');
  });
});
