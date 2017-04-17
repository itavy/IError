'use strict';

/**
 * @external Error
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error}
 */

/**
 * @namespace itavy/Error
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
 * @property {itavy/Error.IError|external:Error|null} [cause] original cause which triggered
 * @property {String} [origStack] stack of the error
 * this error on chain
 * @memberof itavy/Error
 */

const IError = require('./IError').IError;

/**
 * Rejects with IError
 * @param {itavy/Error.IErrorLiteral|external:Error|itavy/Error.IError} request error to reject with
 * @returns {Promise} rejects with an IError
 * @memberof itavy/Error
 */
const rejectIError = request => Promise.reject(Reflect.construct(IError, [
  request,
]));

/**
 * Resolves with IError
 * @param {Object} request error to resolve with
 * @returns {Promise} resolves with an IError
 * @public
 * @memberof itavy/Error
 */
const resolveIError = request => Promise.resolve(Reflect.construct(IError, [
  request,
]));


module.exports = {
  IError,
  rejectIError,
  resolveIError,
};
