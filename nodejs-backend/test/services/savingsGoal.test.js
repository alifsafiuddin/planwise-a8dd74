const assert = require('assert');
const app = require('../../src/app');

describe('\'savingsGoal\' service', () => {
  it('registered the service', () => {
    const service = app.service('savingsGoal');

    assert.ok(service, 'Registered the service (savingsGoal)');
  });
});
