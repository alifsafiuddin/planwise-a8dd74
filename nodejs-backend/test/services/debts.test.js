const assert = require('assert');
const app = require('../../src/app');

describe('\'debts\' service', () => {
  it('registered the service', () => {
    const service = app.service('debts');

    assert.ok(service, 'Registered the service (debts)');
  });
});
