'use strict';

const semver = require('semver');

const minNodeVersion = '8.0.0';

/**
 * check if min nodejs requirements are met
 * @returns {Object} @itavy/IError module
 */
const getVersionModule = () => {
  if (semver.lt(process.version, minNodeVersion)) {
    throw Error(`Invalid node version for @itavy/ierror, current: ${process.version}, min: ${minNodeVersion}`);
  }

  // eslint-disable-next-line global-require
  return require('./lib/latest');
};

module.exports = getVersionModule();
