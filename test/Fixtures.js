'use strict';

const defaultValues = {
  name:      'ERROR',
  severity:  'ERROR',
  source:    null,
  code:      null,
  origStack: null,
  extra:     null,
  cause:     null,
};

const extraInfo = {
  randomInfo: 'randomValue',
};

const errorInfo = {
  message:   'test error',
  name:      'error name',
  severity:  'CRITICAL',
  source:    'test source',
  code:      'test code',
  origStack: {},
  extra:     extraInfo,
  ts:        1234567890,
  cause:     {},
};

const nullSerializedCauseErrorInfo = Object.assign({}, errorInfo, {
  cause: {
    iError: true,
    value:  null,
  },
});

const serializedCause = Object.assign({}, errorInfo, {
  cause: {
    iError: true,
    value:  {
      message: 'serializedCauseMessage',
      code:    'serializedCauseCode',
      name:    'serializedCauseName',
    },
  },
});

const extraSerializeInfo = Object.assign({}, errorInfo, {
  extra: {
    iError: true,
    value:  JSON.stringify(extraInfo),
  },
});

const toJsonSerializationNoCause = Object.assign({}, errorInfo, {
  cause: null,
});
const expectedJsonNoCause = Object.assign({}, errorInfo, {
  extra: {
    iError: true,
    value:  JSON.stringify(extraInfo),
  },
  cause: {
    iError: true,
    value:  null,
  },
});

const toJsonSerializationWithCause = Object.assign({}, errorInfo, {
  cause: Error('test'),
});

const toJsonSerializationNullStack = Object.assign({}, errorInfo, {
  cause:     null,
  origStack: null,
});

const error1 = {
  name: 'nameError1',
  code: 'codeError1',
};
const error2 = {
  name: 'nameError2',
  code: 'codeError2',
};
const error3 = {
  name: 'nameError3',
  code: 'codeError3',
};

const unknownName = 'randomUnknownName';
const unknownCode = 'randomUnknownCode';
const expectedSearchByNameCall = {
  field: 'name',
  value: unknownName,
};
const expectedSearchByCodeCall = {
  field: 'code',
  value: unknownCode,
};

const rejectMessage = 'test reject message';
const resolveMessage = 'test resolve message';

module.exports = {
  defaultValues,
  errorInfo,
  nullSerializedCauseErrorInfo,
  serializedCause,
  extraInfo,
  extraSerializeInfo,
  toJsonSerializationNoCause,
  expectedJsonNoCause,
  toJsonSerializationWithCause,
  toJsonSerializationNullStack,
  error1,
  error2,
  error3,
  unknownName,
  unknownCode,
  expectedSearchByNameCall,
  expectedSearchByCodeCall,
  rejectMessage,
  resolveMessage,
};
