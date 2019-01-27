'use strict';

const { expect, getSinonSandbox } = require('@itavy/test-utilities');
const IErrorLib = require('../lib/latest/IError');
const fixtures = require('./Fixtures');

describe('Serialization', () => {
  let sandbox;

  beforeEach((done) => {
    sandbox = getSinonSandbox();
    done();
  });

  afterEach((done) => {
    sandbox.restore();
    done();
  });

  it('Should have null for cause', (done) => {
    const testError = new IErrorLib.IError(fixtures.nullSerializedCauseErrorInfo);

    expect(testError.cause).to.be.equal(null);
    done();
  });

  it('Should have expected IError instance on cause', (done) => {
    const testError = new IErrorLib.IError(fixtures.serializedCause);

    expect(testError.cause).to.be.instanceof(IErrorLib.IError);
    expect(testError.cause).to.be.have.property('name',
      fixtures.serializedCause.cause.value.name);
    expect(testError.cause).to.be.have.property('code',
      fixtures.serializedCause.cause.value.code);
    expect(testError.cause).to.be.have.property('message',
      fixtures.serializedCause.cause.value.message);
    done();
  });

  it('Should have provided info on extra field', (done) => {
    const testError = new IErrorLib.IError(fixtures.extraSerializeInfo);

    expect(testError.extra).to.be.eql(fixtures.extraInfo);
    done();
  });

  it('Should return expected info on cause field', (done) => {
    const testError = new IErrorLib.IError(fixtures.toJsonSerializationNoCause);

    expect(testError.toJSON()).to.be.eql(fixtures.expectedJsonNoCause);
    done();
  });

  it('Should return expected info on origStack', (done) => {
    const testError = new IErrorLib.IError(fixtures.toJsonSerializationNullStack);

    expect(testError.toJSON().origStack).to.be.equal(testError.stack);
    done();
  });


  it('Should return call toJSON method for cause', (done) => {
    const testError = new IErrorLib.IError(fixtures.toJsonSerializationWithCause);
    const spy = sandbox.spy(testError.cause, 'toJSON');
    testError.toJSON();

    expect(spy.callCount).to.be.equal(1);
    done();
  });

  it('Should return json representation of IError', (done) => {
    const testError = new IErrorLib.IError(fixtures.toJsonSerializationNoCause);
    const spy = sandbox.spy(testError, 'toJSON');
    const testRepresentation = JSON.parse(testError.toString());

    expect(testRepresentation).to.be.eql(fixtures.expectedJsonNoCause);
    expect(spy.callCount).to.be.equal(1);
    done();
  });
});
