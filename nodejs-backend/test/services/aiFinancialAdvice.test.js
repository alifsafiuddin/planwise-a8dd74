const assert = require('assert');
const app = require('../../src/app');

describe('\'aiFinancialAdvice\' service', () => {
  it('registered the service', () => {
    const service = app.service('aiFinancialAdvice');

    assert.ok(service, 'Registered the service (aiFinancialAdvice)');
  });
});
