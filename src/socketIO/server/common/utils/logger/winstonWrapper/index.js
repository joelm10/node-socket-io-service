// winston wrapper
/**
 * ref: https://github.com/winstonjs/winston
 */
const winston = require('winston');
const logDir = './logs';
const timestamp = Date.now();
 
const winstonWrapper =
    winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
            //
            // - Write all logs with importance level of `error` or less to `error.log`
            // - Write all logs with importance level of `info` or less to `combined.log`
            //
            new winston.transports.File({ filename: `${logDir}/error/${timestamp}_error.log`, level: 'error' }),
            new winston.transports.File({ filename: `${logDir}/combined/${timestamp}_combined.log` }),
        ],
    });

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    winstonWrapper.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

module.exports = winstonWrapper;