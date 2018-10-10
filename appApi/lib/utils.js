//var logger = require('./logger');
var util = require('util');
var _ = require('lodash');
var execinshell = require('child_process').execSync, child;
const TIMEOUT_IN_MILLISECONDS = 300000;

// Modify Attr------------------------------------------------------------------:begin
function camelCaseAttr(obj) {
    return recursiveChangeCase(obj, _.camelCase);
}

function snakeCaseAttr(obj) {
    return recursiveChangeCase(obj, _.snakeCase);
}

function recursiveChangeCase(obj, callback) {
    if (!obj || _.isFunction(obj)) {
        return obj;
    } else if (_.isDate(obj)) {
        return obj;
    } else if (Array.isArray(obj)) {
        var ret = Array(obj.length);
        for(var i = 0, l = obj.length; i < l; ++i) {
            ret[i] = recursiveChangeCase(obj[i], callback);
        };
        return ret;
    } else if(_.isObject(obj)) {
        var ret = {};
        for(var i in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, i)) {
                ret[callback(i)] = recursiveChangeCase(obj[i], callback);
            }
        }
        return ret;
    } else {
        return obj;
    }
}

/* Deprecated */
function toCamelCase(str) {
    return str.replace(/_\w/g, function (match, offset) {
        return match[1].toUpperCase();
    });
}

/* Deprecated */
function recursiveCamelCaseAttributes(obj) {
    if (obj == null) {
        // nop;
    } else if (util.isArray(obj)) {
        obj.forEach(function (item, i) {
            obj[i] = recursiveCamelCaseAttributes(item);
        });
    } else if (typeof obj === "object") {
        var keys = Object.keys(obj);
        for (var i = 0; i < keys.length; ++i) {
            var oldKey = keys[i];
            var newKey = toCamelCase(oldKey);

            obj[newKey] = recursiveCamelCaseAttributes(obj[oldKey]);

            if (newKey !== oldKey) {
                delete obj[oldKey];
            }
        }

    }
    return obj;
}

function camelCaseAttributes(obj) {
    recursiveCamelCaseAttributes(obj);
    return obj;
};
//Fix empty charactor
function fixEmpty(str, defaultVal) {
    if (arguments.length === 1) {
        defaultVal = '';
    }
    if (str == null) {
        return defaultVal;
    }
    var ret = String(str).trim();
    return ret ? ret : defaultVal;
}

// Executes commands on the shell; will throw an execption if the command fails
function shellExec(shellCommand, timeout){

    //logger.info('Entering shellExec function');
    //logger.info('Shell command: ', shellCommand);

    if(timeout === undefined){
        timeout = TIMEOUT_IN_MILLISECONDS;
    }
    var options = {encoding:'ascii',timeout:timeout};

    try{
        child = execinshell(shellCommand, options);
      //  logger.info('Shell cmd succeeded');
        return(child);
    }catch(e){
      //  logger.error('ERROR: shell cmd failed',shellCommand);
      //  logger.error('Error is: ', e);
        return '';
    }
};

// Executes commands on the shell; will return true/false
function shellExecReturn(shellCommand, timeout){

   // logger.info('Entering shellExec function');
   // logger.info('Shell command: ', shellCommand);

    if(timeout === undefined){
        timeout = TIMEOUT_IN_MILLISECONDS;
    }
    var options = {encoding:'ascii',timeout:timeout};
    child = execinshell(shellCommand, options);
    if (child) {
     //   logger.info('Shell cmd succeeded');
        return child;
    } else{
       // logger.error('ERROR: shell cmd failed',shellCommand);
        return false;
    }
};

function trim(obj, defaultVal) {
    if (arguments.length === 1) {
        defaultVal = '';
    }
    if (obj == null) {
        return defaultVal;
    }
    return String(obj).trim();
};
function memberOf(array, child){
    for (var i=0; i < array.length; i ++){
        if (child == array[i]) {
            return true;
        }
        if (i == array.length - 1 && child != array[i]) {
            return false;
        }
    }
}

module.exports = {
    shellExecReturn: shellExecReturn,
    shellExec:shellExec,
    trim: trim,
    camelCaseAttributes:camelCaseAttributes,
    fixEmpty:fixEmpty,
    camelCaseAttr: camelCaseAttr,
    snakeCaseAttr:snakeCaseAttr,
    memberOf:memberOf,
    recursiveCamelCaseAttributes:recursiveCamelCaseAttributes
}
