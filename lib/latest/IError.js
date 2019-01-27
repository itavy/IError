'use strict';

const common = require('./Common');

let causeValue;
let origStackValue;

/**
 * Error struture
 * @memberOf itavy/ierror
 */
class IError extends Error {
  /**
   * @param {itavy/ierror.IErrorLiteral} options error info
   */
  constructor(options) {
    if (typeof options === 'string') {
      super(options);
      /**
       * @desc Error message
       * @type {String}
       * @member itavy/ierror.IError#message
       */
      this.message = options;
    } else {
      super(options.message);
      this.message = options.message;
    }
    /* istanbul ignore next */
    if (process.version.charCodeAt(1) < 55 && process.version.charCodeAt(2) === 46) {
      Error.captureStackTrace(this, this.constructor);
    }

    /**
     * @desc Error name
     * @type {String}
     * @default 'ERROR'
     * @member itavy/ierror.IError#name
     */
    this.name = options.name || 'ERROR';
    /**
     * @desc Error UNIX timestamp
     * @type {Number}
     * @default Date.now()
     * @member itavy/ierror.IError#ts
     */
    this.ts = options.ts || Date.now();
    /**
     * @desc Error severity
     * @type {String}
     * @default 'ERROR'
     * @member itavy/ierror.IError#severity
     */
    this.severity = options.severity || 'ERROR';
    /**
     * @desc Error source
     * @type {String}
     * @default null
     * @member itavy/ierror.IError#source
     */
    this.source = options.source || null;
    /**
     * @desc Error code
     * @type {String}
     * @default null
     * @member itavy/ierror.IError#code
     */
    this.code = options.code || null;

    if (common.has(options, 'extra') && common.has(options.extra, 'iError')) {
      // @todo determine if is needed to wrap in a try/catch
      this.extra = JSON.parse(options.extra.value);
    } else {
      /**
       * @desc Error extra information
       * @type {*}
       * @default null
       * @member itavy/ierror.IError#extra
       */
      this.extra = options.extra || null;
    }

    /**
     * @desc Error stack trace
     * @type {String}
     * @default null
     * @readonly
     * @member itavy/ierror.IError#origStack
     */
    Reflect.defineProperty(this, 'origStack', {
      configurable: false,
      enumerable:   false,
      writable:     false,
      value:        origStackValue(options),
    });

    /**
     * @desc Error cause
     * @type {itavy/ierror.IError}
     * @default null
     * @readonly
     * @member itavy/ierror.IError#cause
     */
    Reflect.defineProperty(this, 'cause', {
      configurable: false,
      enumerable:   false,
      writable:     false,
      value:        causeValue(options),
    });
  }

  /**
   * get IError literal representation
   * @returns {itavy/ierror.IErrorLiteral} IError literal representation
   * @public
   */
  toJSON() {
    return Object.assign({}, this, {
      origStack: this.origStack === null ? this.stack : this.origStack,
      message:   this.message,
      extra:     {
        iError: true,
        value:  JSON.stringify(this.extra),
      },
      cause: {
        iError: true,
        value:  this.cause === null ? null : this.cause.toJSON(),
      },
    });
  }

  /**
   * get IError json stringify
   * @returns {String} JSON representation of IError
   * @public
   */
  toString() {
    return common.stringify(this.toJSON());
  }

  /**
   * Check all cause chain to see if an error with requested name exists
   * @param {String} name name of the error to look after
   * @returns {Boolean} true if an error with a name exists
   * @public
   */
  hasErrorWithName(name) {
    return this.getErrorWithName(name) !== null;
  }

  /**
   * Check all cause chain to see if an error with requested code exists
   * @param {String} code code of the error to look after
   * @returns {Boolean} true if an error with a code exists
   * @public
   */
  hasErrorWithCode(code) {
    return this.getErrorWithCode(code) !== null;
  }

  /**
   * Traverse all chain to get error with requested name
   * @param {String} name name of the error to look after
   * @returns {itavy/ierror.IError|null} IError found or null otherwise
   * @public
   */
  getErrorWithName(name) {
    return this.hasErrorWithParameters({
      field: 'name',
      value: name,
    });
  }

  /**
   * Traverse all chain to get error with requested code
   * @param {String} code code of the error to look after
   * @returns {itavy/ierror.IError|null} IError found or null otherwise
   * @public
   */
  getErrorWithCode(code) {
    return this.hasErrorWithParameters({
      field: 'code',
      value: code,
    });
  }

  /**
   * traverse recursive the chain looking for condition
   * @param {Object} request check request
   * @param {String} request.field field to look after
   * @param {String} request.value stop value for traversing
   * @returns {itavy/ierror.IError|null} coresponding cause or null if not found
   * @private
   */
  hasErrorWithParameters(request) {
    if (this[request.field] === request.value) {
      return this;
    }
    if (this.cause === null || !(this.cause instanceof IError)) {
      return null;
    }
    return this.cause.hasErrorWithParameters(request);
  }
}

/**
 * Construct origStack for Ierror
 * @param {*} options build options
 * @returns {*} origStack value
 * @private
 */
origStackValue = (options) => {
  if (options instanceof Error) {
    return options.stack;
  }
  return options.origStack || null;
};

/**
 * Construct cause for Ierror
 * @param {*} options build options
 * @returns {*} cause value
 * @private
 */
causeValue = (options) => {
  if (common.has(options, 'cause')) {
    if (options.cause instanceof Error && !(options.cause instanceof IError)) {
      return Reflect.construct(IError, [options.cause]);
    }
    if (common.has(options.cause, 'iError')) {
      if (options.cause.value === null) {
        return null;
      }
      return Reflect.construct(IError, [options.cause.value]);
    }
    return options.cause;
  }
  return null;
};

module.exports = {
  IError,
};
