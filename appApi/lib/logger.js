/*
usage , please refere to https://github.com/winstonjs/winston
https://github.com/winstonjs/winston-daily-rotate-file
Logging Levels:
{
  emerg: 0,
  alert: 1,
  crit: 2,
  error: 3,
  warning: 4,
  notice: 5,
  info: 6,
  debug: 7
}
*/

var fs = require('fs');
var path = require('path');
var winston = require('winston');
var dirName = __dirname;
var logDir = path.join(dirName, '../log');
fs.existsSync(logDir) || fs.mkdirSync(logDir);
require('winston-daily-rotate-file');

var logger = new winston.createLogger({
    transports: [
        new winston.transports.DailyRotateFile({
            name: 'file-info',
            level: 'info',
            filename: path.join(logDir, "file-info.log"),
            datePattern: 'YYYY-MM-DD-HH',
            timestamp: true,
            zippedArchive: true,
            maxSize: '1m',
            maxFiles: '30d'
        }),
        new winston.transports.DailyRotateFile({
            name: 'file-error',
            level: 'error',
            filename: path.join(logDir, "file-error.log"),
            datePattern: 'YYYY-MM-DD-HH',
            timestamp: true,
            zippedArchive: true,
            maxSize: '1m',
            maxFiles: '30d'
        }),
        new winston.transports.DailyRotateFile({
            name: 'file-debug',
            level: 'debug',
            filename: path.join(logDir, "file-debug.log"),
            datePattern: 'YYYY-MM-DD-HH',
            timestamp: true,
            zippedArchive: true,
            maxSize: '1m',
            maxFiles: '30d'
        })
    ]
});

module.exports = logger
