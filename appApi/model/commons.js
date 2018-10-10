var Q = require('q');

var utils = require('../lib/utils');

function findBySerial(db, sql, serial) {
    var deferred = Q.defer();
    db.getConnection(function (err, connection) {
        connection.query(sql, [serial], function (err, objs) {
            connection.release();
            if (err || !objs || objs.length === 0) {
                deferred.resolve(null);
            } else {
                deferred.resolve(utils.camelCaseAttr(objs[0]));
            }
        });
    });
    return deferred.promise;
}

function findAll(db, sql, params) {
    var deferred = Q.defer();
    db.getConnection(function (err, connection) {
        connection.query(sql, params, function (err, objs) {
            connection.release();
            if (err || !objs || objs.length === 0) {
                deferred.resolve([]);
            } else {
                deferred.resolve(utils.camelCaseAttr(objs));
            }
        });
    });
    return deferred.promise;
}

function execUpdate(db, sql, params) {
    var deferred = Q.defer();
    db.getConnection(function(err, connection) {
        connection.query(sql, params, function (err, objs) {
            connection.release();
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(true);
            }
        });
    });
    return deferred.promise;
}

function execInsert(db, sql, data) {
    var deferred = Q.defer();
    db.getConnection(function(err, connection) {
        var tmpQuery = connection.query(sql, data, function(err, result) {
            connection.release();
            if (err) {
                deferred.reject(err);
            } else {
                data.id = result.insertId;
                deferred.resolve(utils.camelCaseAttr(data));
            }
        });
    });
    return deferred.promise;
}

function execRemove(db, sql, data) {
    var deferred = Q.defer();
    db.getConnection(function(err, connection) {
        connection.query(sql, data, function(err, result) {
            connection.release();
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve();
            }
        });
    });
    return deferred.promise;
}

module.exports = {
    findBySerial: findBySerial,
    findAll: findAll,
    execUpdate: execUpdate,
    execInsert: execInsert,
    execRemove: execRemove
};
