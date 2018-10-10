var mysql = require('mysql');

var settings = require('../settings');

var pool = mysql.createPool({
    connectionLimit: 50,
    host: settings.DB.HOST,
    database: settings.DB.NAME,
    user: settings.DB.USER,
    password: settings.DB.PASS,
    timezone: 'UTC'
});


exports.getConnection = function(callback) {
    pool.getConnection(callback);
};
