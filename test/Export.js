'use strict';

const { expect } = require('@itavy/test-utilities');
const moduleLib = require('../lib/latest/index');
const IErrorLib = require('../lib/latest/IError');
const fixtures = require('./Fixtures');

describe('Export', () => {
  it('Should export expected properties', (done) => {
    expect(moduleLib).to.have.property('IError');
    expect(moduleLib.IError).to.be.equal(IErrorLib.IError);
    expect(moduleLib).to.have.property('rejectIError');
    expect(moduleLib.rejectIError).to.be.instanceOf(Function);
    expect(moduleLib).to.have.property('resolveIError');
    expect(moduleLib.resolveIError).to.be.instanceOf(Function);
    done();
  });

  it('Should reject with a IError', () => moduleLib.rejectIError(fixtures.rejectMessage)
    .should.be.rejected
    .then((response) => {
      expect(response).to.be.instanceOf(IErrorLib.IError);
      expect(response.message).to.be.equal(fixtures.rejectMessage);
      return Promise.resolve();
    }));

  it('Should resolve with a IError', () => moduleLib.resolveIError(fixtures.resolveMessage)
    .should.be.fulfilled
    .then((response) => {
      expect(response).to.be.instanceOf(IErrorLib.IError);
      expect(response.message).to.be.equal(fixtures.resolveMessage);
      return Promise.resolve();
    }));

  it('Should reject with a IError using provided builder', () => new Promise((resolve, reject) => {
    moduleLib.rejectIError(fixtures.rejectMessage, reject);
  })
    .should.be.rejected
    .then((response) => {
      expect(response).to.be.instanceOf(IErrorLib.IError);
      expect(response.message).to.be.equal(fixtures.rejectMessage);
      return Promise.resolve();
    }));

  it('Should resolve with a IError using provided builder', () => new Promise((resolve) => {
    moduleLib.resolveIError(fixtures.resolveMessage, resolve);
  })
    .should.be.fulfilled
    .then((response) => {
      expect(response).to.be.instanceOf(IErrorLib.IError);
      expect(response.message).to.be.equal(fixtures.resolveMessage);
      return Promise.resolve();
    }));
});
