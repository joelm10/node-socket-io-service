const winstonWrapper = require('./winstonWrapper');

/**
 * TODO: use winston here
 * Ref: https://www.npmjs.com/package/winston
 * @param {string} msg 
 * @param {string} type 
 */
const logger = (msg, type) => {
    if (type === 'info') {
        console.info(`${type}: ${msg}`);
        winstonWrapper.info(msg);
    }
    if (type === 'warn') {
        console.warn(`${type}: ${msg}`);
    }
    if (type === 'log') {
        console.log(`${type}: ${msg}`);
    }

};

module.exports = logger;