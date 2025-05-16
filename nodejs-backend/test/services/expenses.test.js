const assert = require('assert');
const app = require('../../src/app');

describe('\'expenses\' service', () => {
  it('registered the service', () => {
    const service = app.service('expenses');

    assert.ok(service, 'Registered the service (expenses)');
  });
});
