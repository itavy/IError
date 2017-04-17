'use strict';

const expect = require('@itavy/test-utilities').getExpect();
const sinon = require('@itavy/test-utilities').getSinon();
const IErrorLib = require('../lib/v6x/IError');
const fixtures = require('./Fixtures');

describe('Serialization', () => {
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


  it('Should return call toJSON method for cause', sinon.test(function fSinonTest(done) {
    const testError = new IErrorLib.IError(fixtures.toJsonSerializationWithCause);
    const spy = this.spy(testError.cause, 'toJSON');
    testError.toJSON();

    expect(spy.callCount).to.be.equal(1);
    done();
  }));

  it('Should return json representation of IError', sinon.test(function fSinonTest(done) {
    const testError = new IErrorLib.IError(fixtures.toJsonSerializationNoCause);
    const spy = this.spy(testError, 'toJSON');
    const testRepresentation = JSON.parse(testError.toString());

    expect(testRepresentation).to.be.eql(fixtures.expectedJsonNoCause);
    expect(spy.callCount).to.be.equal(1);
    done();
  }));
});
