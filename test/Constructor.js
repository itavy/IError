'use strict';

const expect = require('@itavy/test-utilities').getExpect();
const IErrorLib = require('../lib/v6x/IError');
const fixtures = require('./Fixtures');

describe('Initialization', () => {
  it('Should export only IError', (done) => {
    const ierrorExport = Object.keys(IErrorLib);
    const expectedExport = ['IError'];

    expect(ierrorExport).to.be.eql(expectedExport);
    done();
  });

  it('IError should use default values if none provided', (done) => {
    const testError = new IErrorLib.IError('test error');

    expect(testError).to.have.property('name', fixtures.defaultValues.name);
    expect(testError).to.have.property('severity', fixtures.defaultValues.severity);
    expect(testError).to.have.property('source', fixtures.defaultValues.source);
    expect(testError).to.have.property('code', fixtures.defaultValues.code);
    expect(testError).to.have.property('origStack', fixtures.defaultValues.origStack);
    expect(testError).to.have.property('extra', fixtures.defaultValues.extra);
    expect(testError).to.have.property('cause', fixtures.defaultValues.cause);
    expect(testError).to.have.property('ts').gt(0);
    done();
  });

  it('IError should use provided values', (done) => {
    const testError = new IErrorLib.IError(fixtures.errorInfo);

    expect(testError).to.have.property('name', fixtures.errorInfo.name);
    expect(testError).to.have.property('severity', fixtures.errorInfo.severity);
    expect(testError).to.have.property('source', fixtures.errorInfo.source);
    expect(testError).to.have.property('code', fixtures.errorInfo.code);
    expect(testError).to.have.property('origStack', fixtures.errorInfo.origStack);
    expect(testError).to.have.property('extra', fixtures.errorInfo.extra);
    expect(testError).to.have.property('cause', fixtures.errorInfo.cause);
    expect(testError).to.have.property('ts', fixtures.errorInfo.ts);
    done();
  });

  it('Should convert native Error to IError', (done) => {
    const e = new Error('testNativeError');
    e.name = 'testNativeName';
    const eStack = e.stack;
    const testError = new IErrorLib.IError(e);

    expect(testError).to.have.property('message', 'testNativeError');
    expect(testError).to.have.property('name', 'testNativeName');
    expect(testError).to.have.property('origStack', eStack);
    done();
  });

  it('Should create new Ierror when cause is a native error', (done) => {
    const e = new Error('testNativeError');
    e.name = 'testNativeName';
    const eStack = e.stack;

    const testError = new IErrorLib.IError({
      message: 'customErrorMessage',
      name:    'customErrorName',
      cause:   e,
    });

    expect(testError.cause).to.be.instanceOf(IErrorLib.IError);
    expect(testError.cause).to.have.property('message', 'testNativeError');
    expect(testError.cause).to.have.property('name', 'testNativeName');
    expect(testError.cause).to.have.property('origStack', eStack);
    done();
  });
});
