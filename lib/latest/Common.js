'use strict';

const fastSafeStringify = require('fast-safe-stringify');

/* istanbul ignore next */
/**
 * safe JSON strinfigy
 * @param {*} request request that need to be stringified
 * @returns {String} JSON representation of the request
 * @private
 */
const stringify = (request) => {
  try {
    return JSON.stringify(request);
  } catch (_) {
    return fastSafeStringify(request);
  }
};

/* istanbul ignore next */
/**
 * check if an object has requested property
 * @param {*} obj target to be checked
 * @param {String} property name of the property to look for
 * @returns {Boolean} returns true if the property exists
 * @private
 */
const has = (obj, property) => {
  if (obj === null) {
    return false;
  }
  return Object.prototype.hasOwnProperty.call(obj, property);
};

module.exports = {
  stringify,
  has,
};
