var path = require('path');

var BASE_DIR = __dirname;
var LOG_DIR = path.join(BASE_DIR, 'logs');
var STATIC_DIR = path.join(BASE_DIR, 'public');

exports.BASE_DIR = BASE_DIR;
exports.LOG_DIR = LOG_DIR;
exports.STATIC_DIR = STATIC_DIR;

exports.DB = {
	HOST: '127.0.0.1',
	NAME: 'express-mysql-demo',
	USER: 'root',
	PASS: '123456'
}