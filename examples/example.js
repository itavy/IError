'use strict';

const IError = require('../').IError;
const inspect = require('eyes').inspector({maxLength: false});

const e = Error('Native Error');
e.name = 'eNative';

const e1 = new IError({
  message: 'e1 message',
  name: 'e1 name',
  code: 'code-e1',
  cause: e
});

const e2 = new IError({
  message: 'e2 message',
  name: 'e2 name',
  code: 'code-e2',
  cause: e1,
});

const serializedChain = e2.toString();

const e3 = new IError(JSON.parse(serializedChain));

inspect(e3.toJSON());

console.log('NAME NATIVE:', e3.hasErrorWithName('eNative'));
console.log('NAME E1:', e3.hasErrorWithName('e1 name'));
console.log('NAME E2:', e3.hasErrorWithName('e2 name'));
console.log('NAME UNKNOWN:', e3.hasErrorWithName('UNKNOWN'));

console.log('CODE c-e1:', e3.hasErrorWithCode('code-e1'));
console.log('CODE c-e2:', e3.hasErrorWithCode('code-e2'));
console.log('CODE UNKNOWN:', e3.hasErrorWithCode('UNKNOWN'));

inspect('############### ENATIVE ###############');
inspect(e3.getErrorWithName('eNative').toJSON());
inspect('############### C-E1 ###############');
inspect(e3.getErrorWithCode('code-e1').toJSON());
