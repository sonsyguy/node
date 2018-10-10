var Q = require('q');
var request = require('request');

var mysql = require('../lib/mysql');
var utils = require('../lib/utils');
var settings = require('../settings');
var commons = require('./commons');

/*var SQL_findById = 'select * from caas where serial=?';
function findBySerial(serial) {
    console.log('sql command:', SQL_findById)
    console.log('serial:', serial)
    return commons.findBySerial(mysql, SQL_findById, serial);
}*/

//var SQL_findAll = 'select * from  v_cameraOnHost where 1=1';
var SQL_findAll = 'select * from  caas where 1=1';
function findAll(filter,Hidden) {
	console.log(filter);
    var sql = SQL_findAll,
        params = [],
        isHidden = parseInt(Hidden);
    /*if (isHidden == 0) {
        sql += ' and Hidden=' + isHidden;
    }*/
    if(filter.id) {
        sql += ' and id=?';
        params.push(filter.id);
    }
    /*if(filter.hostname) {
        sql += ' and hostname=?';
        params.push(filter.hostname);
    }
    if(filter.ipAddress) {
        sql += ' and ipAddress=?';
        params.push(filter.ipAddress);
    }
    if(filter.serial) {
        sql += ' and serial=?';
        params.push(filter.serial);
    }
    if(filter.lab) {
        sql += ' and lab=?';
        params.push(filter.lab);
    }
    if(filter.site) {
        sql += ' and site=?';
        params.push(filter.site);
    }*/
    //console.log(sql);
    //console.log(filter);
    return commons.findAll(mysql, sql, params);
}
/* Options operations begin */
/*var insert = function (filter){
    var ipAddress = "",
        hostname = "";
    if (filter.ipAddress) {
        ipAddress = filter.ipAddress
    }
    if (filter.hostname) {
        hostname = filter.hostname
    }
    var params=[hostname,ipAddress,filter.serial];
    var insertSQL = 'insert into t_cameras (hostname, ipAddress, serial) value(?,?,?)'
    return commons.execInsert(mysql, insertSQL, params)
    console.log('params: ' + params)

};
function deleteCam(serial) {
    var params=serial;
    var deleteSQL = 'update t_cameras SET Hidden = 1 where serial =?;'
    console.log('params:',params);
    console.log('params:',deleteSQL);
    return commons.execUpdate(mysql, deleteSQL, params)
    console.log('delete')
}

function update(filter){
    var params=[filter.hostname, filter.ipAddress,filter.serial];
    var deleteSQL = 'update t_cameras SET hostname=?, ipAddress=?,Hidden=0 where serial =?;'
    console.log('params:',params);
    console.log('params:',deleteSQL);
    return commons.execUpdate(mysql, deleteSQL, params)
    console.log('delete')
}
function deleteAllbyHost(filter) {
    console.log("filter in module", filter)
    var deleteSQL = 'update t_cameras SET Hidden = 1 where 1 = 1';
    var params = [],
        condition ="";
    if (filter.hostname){
        condition += " and hostname = ?";
        params.push(filter.hostname);
    }
    if (filter.ipAddress){
        condition += " and ipAddress = ?";
        params.push(filter.ipAddress);
    }
    if (condition.length >0){;
        deleteSQL += condition
        console.log('params:',deleteSQL);
        return commons.execUpdate(mysql, deleteSQL, params)

    } else {
        return false;
    }

}
*/
module.exports = {
    findAll: findAll
};
