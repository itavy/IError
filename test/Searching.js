'use strict';

const expect = require('@itavy/test-utilities').getExpect();
const sinon = require('@itavy/test-utilities').getSinon();
const IErrorLib = require('../lib/v6x/IError');
const fixtures = require('./Fixtures');

let e1;
let e2;
let e3;
before((done) => {
  e1 = new IErrorLib.IError(fixtures.error1);
  e2 = new IErrorLib.IError(Object.assign({}, fixtures.error2, {
    cause: e1,
  }));
  e3 = new IErrorLib.IError(Object.assign({}, fixtures.error3, {
    cause: e2,
  }));
  done();
});

after((done) => {
  e1 = null;
  e2 = null;
  e3 = null;
  done();
});

describe('Searching', () => {
  it('Search by unknown name should return null', sinon.test(function fSinonTest(done) {
    const spy = this.spy(e3, 'hasErrorWithParameters');
    const eSearch = e3.getErrorWithName(fixtures.unknownName);

    expect(spy.callCount).to.be.equal(1);
    expect(spy.getCall(0).args[0]).to.be.eql(fixtures.expectedSearchByNameCall);

    expect(eSearch).to.be.equal(null);
    done();
  }));

  it('Search by name should return expected error from chain', (done) => {
    const eSearch = e3.getErrorWithName(fixtures.error1.name);

    expect(eSearch).to.be.instanceOf(IErrorLib.IError);
    expect(eSearch).to.be.equal(e1);
    done();
  });

  it('Search by unknown code should return null', sinon.test(function fSinonTest(done) {
    const spy = this.spy(e3, 'hasErrorWithParameters');
    const eSearch = e3.getErrorWithCode(fixtures.unknownCode);

    expect(spy.callCount).to.be.equal(1);
    expect(spy.getCall(0).args[0]).to.be.eql(fixtures.expectedSearchByCodeCall);

    expect(eSearch).to.be.equal(null);
    done();
  }));

  it('Search by code should return expected error from chain', (done) => {
    const eSearch = e3.getErrorWithCode(fixtures.error2.code);

    expect(eSearch).to.be.instanceOf(IErrorLib.IError);
    expect(eSearch).to.be.equal(e2);
    done();
  });

  it('Should return false for unknown error name in chain', sinon.test(function fSinonTest(done) {
    const spy = this.spy(e3, 'getErrorWithName');
    const eSearch = e3.hasErrorWithName(fixtures.unknownName);

    expect(spy.callCount).to.be.equal(1);
    expect(spy.getCall(0).args[0]).to.be.equal(fixtures.unknownName);

    expect(eSearch).to.be.equal(false);
    done();
  }));

  it('Should return true for existing error name in chain', sinon.test(function fSinonTest(done) {
    const spy = this.spy(e3, 'getErrorWithName');
    const eSearch = e3.hasErrorWithName(fixtures.error1.name);

    expect(spy.callCount).to.be.equal(1);
    expect(spy.getCall(0).args[0]).to.be.equal(fixtures.error1.name);

    expect(eSearch).to.be.equal(true);
    done();
  }));

  it('Should return false for unknown error code in chain', sinon.test(function fSinonTest(done) {
    const spy = this.spy(e3, 'getErrorWithCode');
    const eSearch = e3.hasErrorWithCode(fixtures.unknownCode);

    expect(spy.callCount).to.be.equal(1);
    expect(spy.getCall(0).args[0]).to.be.equal(fixtures.unknownCode);

    expect(eSearch).to.be.equal(false);
    done();
  }));

  it('Should return true for existing error code in chain', sinon.test(function fSinonTest(done) {
    const spy = this.spy(e3, 'getErrorWithCode');
    const eSearch = e3.hasErrorWithCode(fixtures.error1.code);

    expect(spy.callCount).to.be.equal(1);
    expect(spy.getCall(0).args[0]).to.be.equal(fixtures.error1.code);

    expect(eSearch).to.be.equal(true);
    done();
  }));
});
