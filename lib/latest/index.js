'use strict';

/**
 * @external Error
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error}
 */

/**
 * @namespace itavy/IError
 */
/**
 * @typedef {Object} IErrorLiteral
 * @property {String} message Error message
 * @property {String} [name='ERROR'] Error name
 * @property {Number} [ts=Date.now()] Error UNIX timestamp
 * @property {String} [severity='ERROR'] Error severity
 * @property {String} [source=null] Error source
 * @property {String} [code=null] Error code
 * @property {*} [extra=null] Extra information needed to be held with the error
 * @property {itavy/ierror.IError|external:Error|null} [cause]
 * original cause which triggered
 * @property {String} [origStack] stack of the error
 * this error on chain
 * @memberof itavy/ierror
 */

const { IError } = require('./IError');

/**
 * Rejects with IError
 * @param {itavy/IError.IErrorLiteral|external:Error|itavy/IError.IError} request
 * error to reject with
 * @param {Promise} rejectBuilder reject promise builder
 * @returns {Promise} rejects with an IError
 * @memberof itavy/IError
 */
const rejectIError = (request, rejectBuilder = null) => {
  if (rejectBuilder) {
    return rejectBuilder(Reflect.construct(IError, [
      request,
    ]));
  }
  return Promise.reject(Reflect.construct(IError, [
    request,
  ]));
};

/**
 * Resolves with IError
 * @param {Object} request error to resolve with
 * @param {Promise} resolveBuilder reject promise builder
 * @returns {Promise} resolves with an IError
 * @public
 * @memberof itavy/IError
 */
const resolveIError = (request, resolveBuilder = null) => {
  if (resolveBuilder) {
    return resolveBuilder(Reflect.construct(IError, [
      request,
    ]));
  }
  return Promise.resolve(Reflect.construct(IError, [
    request,
  ]));
};


module.exports = {
  IError,
  rejectIError,
  resolveIError,
};
