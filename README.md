# IError

This is a module provides support for some missing features of native errors, working as a drop in replacement for native errors:

- chain of causes
- custom information for the error
- timestamp of the error occurrence
- serialization and composing back the object from serialization

## Instalation

```
npm install @itavy/IError
```

## Quick Example
```
const IError = require('@itavy/IError').IError;

const err = new IError('test error');
console.log(err);
```
this will produce:
```
{ ERROR: test error
    at Object.<anonymous> (/**********/test.js:3:13)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)
    at Module.runMain (module.js:604:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:509:3
  name: 'ERROR',
  ts: 1492430124565,
  severity: 'ERROR',
  source: null,
  code: null,
  extra: null }
```

## API
<a name="itavy/ierror"></a>

## itavy/ierror : <code>object</code>
**Kind**: global namespace  

* [itavy/ierror](#itavy/ierror) : <code>object</code>
    * [.IError](#itavy/ierror.IError)
        * [new IError(options)](#new_itavy/ierror.IError_new)
        * [.message](#itavy/ierror.IError+message) : <code>String</code>
        * [.name](#itavy/ierror.IError+name) : <code>String</code>
        * [.ts](#itavy/ierror.IError+ts) : <code>Number</code>
        * [.severity](#itavy/ierror.IError+severity) : <code>String</code>
        * [.source](#itavy/ierror.IError+source) : <code>String</code>
        * [.code](#itavy/ierror.IError+code) : <code>String</code>
        * [.extra](#itavy/ierror.IError+extra) : <code>\*</code>
        * [.origStack](#itavy/ierror.IError+origStack) : <code>String</code>
        * [.cause](#itavy/ierror.IError+cause) : <code>[IError](#itavy/ierror.IError)</code>
        * [.toJSON()](#itavy/ierror.IError+toJSON) ⇒ <code>[IErrorLiteral](#itavy/ierror.IErrorLiteral)</code>
        * [.toString()](#itavy/ierror.IError+toString) ⇒ <code>String</code>
        * [.hasErrorWithName(name)](#itavy/ierror.IError+hasErrorWithName) ⇒ <code>Boolean</code>
        * [.hasErrorWithCode(code)](#itavy/ierror.IError+hasErrorWithCode) ⇒ <code>Boolean</code>
        * [.getErrorWithName(name)](#itavy/ierror.IError+getErrorWithName) ⇒ <code>[IError](#itavy/ierror.IError)</code> \| <code>null</code>
        * [.getErrorWithCode(code)](#itavy/ierror.IError+getErrorWithCode) ⇒ <code>[IError](#itavy/ierror.IError)</code> \| <code>null</code>
    * [.rejectIError(request)](#itavy/ierror.rejectIError) ⇒ <code>Promise</code>
    * [.resolveIError(request)](#itavy/ierror.resolveIError) ⇒ <code>Promise</code>
    * [.IErrorLiteral](#itavy/ierror.IErrorLiteral) : <code>Object</code>

<a name="itavy/ierror.IError"></a>

### itavy/ierror.IError
Error struture

**Kind**: static class of <code>[itavy/ierror](#itavy/ierror)</code>  

* [.IError](#itavy/ierror.IError)
    * [new IError(options)](#new_itavy/ierror.IError_new)
    * [.message](#itavy/ierror.IError+message) : <code>String</code>
    * [.name](#itavy/ierror.IError+name) : <code>String</code>
    * [.ts](#itavy/ierror.IError+ts) : <code>Number</code>
    * [.severity](#itavy/ierror.IError+severity) : <code>String</code>
    * [.source](#itavy/ierror.IError+source) : <code>String</code>
    * [.code](#itavy/ierror.IError+code) : <code>String</code>
    * [.extra](#itavy/ierror.IError+extra) : <code>\*</code>
    * [.origStack](#itavy/ierror.IError+origStack) : <code>String</code>
    * [.cause](#itavy/ierror.IError+cause) : <code>[IError](#itavy/ierror.IError)</code>
    * [.toJSON()](#itavy/ierror.IError+toJSON) ⇒ <code>[IErrorLiteral](#itavy/ierror.IErrorLiteral)</code>
    * [.toString()](#itavy/ierror.IError+toString) ⇒ <code>String</code>
    * [.hasErrorWithName(name)](#itavy/ierror.IError+hasErrorWithName) ⇒ <code>Boolean</code>
    * [.hasErrorWithCode(code)](#itavy/ierror.IError+hasErrorWithCode) ⇒ <code>Boolean</code>
    * [.getErrorWithName(name)](#itavy/ierror.IError+getErrorWithName) ⇒ <code>[IError](#itavy/ierror.IError)</code> \| <code>null</code>
    * [.getErrorWithCode(code)](#itavy/ierror.IError+getErrorWithCode) ⇒ <code>[IError](#itavy/ierror.IError)</code> \| <code>null</code>

<a name="new_itavy/ierror.IError_new"></a>

#### new IError(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>[IErrorLiteral](#itavy/ierror.IErrorLiteral)</code> | error info |

<a name="itavy/ierror.IError+message"></a>

#### iError.message : <code>String</code>
Error message

**Kind**: instance property of <code>[IError](#itavy/ierror.IError)</code>  
<a name="itavy/ierror.IError+name"></a>

#### iError.name : <code>String</code>
Error name

**Kind**: instance property of <code>[IError](#itavy/ierror.IError)</code>  
**Default**: <code>&#x27;ERROR&#x27;</code>  
<a name="itavy/ierror.IError+ts"></a>

#### iError.ts : <code>Number</code>
Error UNIX timestamp

**Kind**: instance property of <code>[IError](#itavy/ierror.IError)</code>  
**Default**: <code>Date.now()</code>  
<a name="itavy/ierror.IError+severity"></a>

#### iError.severity : <code>String</code>
Error severity

**Kind**: instance property of <code>[IError](#itavy/ierror.IError)</code>  
**Default**: <code>&#x27;ERROR&#x27;</code>  
<a name="itavy/ierror.IError+source"></a>

#### iError.source : <code>String</code>
Error source

**Kind**: instance property of <code>[IError](#itavy/ierror.IError)</code>  
**Default**: <code>null</code>  
<a name="itavy/ierror.IError+code"></a>

#### iError.code : <code>String</code>
Error code

**Kind**: instance property of <code>[IError](#itavy/ierror.IError)</code>  
**Default**: <code>null</code>  
<a name="itavy/ierror.IError+extra"></a>

#### iError.extra : <code>\*</code>
Error extra information

**Kind**: instance property of <code>[IError](#itavy/ierror.IError)</code>  
**Default**: <code>null</code>  
<a name="itavy/ierror.IError+origStack"></a>

#### iError.origStack : <code>String</code>
Error stack trace

**Kind**: instance property of <code>[IError](#itavy/ierror.IError)</code>  
**Default**: <code>null</code>  
**Read only**: true  
<a name="itavy/ierror.IError+cause"></a>

#### iError.cause : <code>[IError](#itavy/ierror.IError)</code>
Error cause

**Kind**: instance property of <code>[IError](#itavy/ierror.IError)</code>  
**Default**: <code>null</code>  
**Read only**: true  
<a name="itavy/ierror.IError+toJSON"></a>

#### iError.toJSON() ⇒ <code>[IErrorLiteral](#itavy/ierror.IErrorLiteral)</code>
get IError literal representation

**Kind**: instance method of <code>[IError](#itavy/ierror.IError)</code>  
**Returns**: <code>[IErrorLiteral](#itavy/ierror.IErrorLiteral)</code> - IError literal representation  
**Access**: public  
<a name="itavy/ierror.IError+toString"></a>

#### iError.toString() ⇒ <code>String</code>
get IError json stringify

**Kind**: instance method of <code>[IError](#itavy/ierror.IError)</code>  
**Returns**: <code>String</code> - JSON representation of IError  
**Access**: public  
<a name="itavy/ierror.IError+hasErrorWithName"></a>

#### iError.hasErrorWithName(name) ⇒ <code>Boolean</code>
Check all cause chain to see if an error with requested name exists

**Kind**: instance method of <code>[IError](#itavy/ierror.IError)</code>  
**Returns**: <code>Boolean</code> - true if an error with a name exists  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | name of the error to look after |

<a name="itavy/ierror.IError+hasErrorWithCode"></a>

#### iError.hasErrorWithCode(code) ⇒ <code>Boolean</code>
Check all cause chain to see if an error with requested code exists

**Kind**: instance method of <code>[IError](#itavy/ierror.IError)</code>  
**Returns**: <code>Boolean</code> - true if an error with a code exists  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>String</code> | code of the error to look after |

<a name="itavy/ierror.IError+getErrorWithName"></a>

#### iError.getErrorWithName(name) ⇒ <code>[IError](#itavy/ierror.IError)</code> \| <code>null</code>
Traverse all chain to get error with requested name

**Kind**: instance method of <code>[IError](#itavy/ierror.IError)</code>  
**Returns**: <code>[IError](#itavy/ierror.IError)</code> \| <code>null</code> - IError found or null otherwise  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | name of the error to look after |

<a name="itavy/ierror.IError+getErrorWithCode"></a>

#### iError.getErrorWithCode(code) ⇒ <code>[IError](#itavy/ierror.IError)</code> \| <code>null</code>
Traverse all chain to get error with requested code

**Kind**: instance method of <code>[IError](#itavy/ierror.IError)</code>  
**Returns**: <code>[IError](#itavy/ierror.IError)</code> \| <code>null</code> - IError found or null otherwise  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>String</code> | code of the error to look after |

<a name="itavy/ierror.rejectIError"></a>

### itavy/ierror.rejectIError(request) ⇒ <code>Promise</code>
Rejects with IError

**Kind**: static method of <code>[itavy/ierror](#itavy/ierror)</code>  
**Returns**: <code>Promise</code> - rejects with an IError  

| Param | Type | Description |
| --- | --- | --- |
| request | <code>[IErrorLiteral](#itavy/ierror.IErrorLiteral)</code> \| <code>[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)</code> \| <code>[IError](#itavy/ierror.IError)</code> | error to reject with |

<a name="itavy/ierror.resolveIError"></a>

### itavy/ierror.resolveIError(request) ⇒ <code>Promise</code>
Resolves with IError

**Kind**: static method of <code>[itavy/ierror](#itavy/ierror)</code>  
**Returns**: <code>Promise</code> - resolves with an IError  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| request | <code>Object</code> | error to resolve with |

<a name="itavy/ierror.IErrorLiteral"></a>

### itavy/ierror.IErrorLiteral : <code>Object</code>
**Kind**: static typedef of <code>[itavy/ierror](#itavy/ierror)</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| message | <code>String</code> |  | Error message |
| name | <code>String</code> | <code>&#x27;ERROR&#x27;</code> | Error name |
| ts | <code>Number</code> | <code>Date.now()</code> | Error UNIX timestamp |
| severity | <code>String</code> | <code>&#x27;ERROR&#x27;</code> | Error severity |
| source | <code>String</code> | <code></code> | Error source |
| code | <code>String</code> | <code></code> | Error code |
| extra | <code>\*</code> | <code></code> | Extra information needed to be held with the error |
| cause | <code>[IError](#itavy/ierror.IError)</code> \| <code>[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)</code> \| <code>null</code> |  | original cause which triggered |
| origStack | <code>String</code> |  | stack of the error this error on chain |


## Usage

see [Example](https://github.com/itavy/IError/blob/master/examples/example.js)

## LICENSE

[MIT](https://github.com/itavy/IError/blob/master/LICENSE.md)
