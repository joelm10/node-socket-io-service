/**
 *  Simple socketIO server demo
 *
 */
//  Ref:    https://socket.io/docs/#Using-with-Express
const app = require('express')();
const server = require('http').Server(app);

const ioWrapper = require('./socketIo/ioWrapper');
const logger = require('./common/utils/logger');

// TODO: rename and add in support for .env file
const SERVER_CONFIG = require('./config/SERVER_CONFIG');
const config = SERVER_CONFIG;

/**
 *  Express server to return a mock html file
 * @param {*} app
 */
const appServer = (config) => {
    const { BASE_URL, PORT, DATA_SET } = config;
    logger('======== appServer start ========', 'info');
    logger(`======== appServer available at: ${BASE_URL}:${PORT} ========`, 'info');

    app.get('/', (req, res) => {
        logger(`======== appServer request on port: ${PORT}`, 'info');
        res.sendFile(DATA_SET.indexPage);
    });

    return app;
};

try {
    server.listen(SERVER_CONFIG.PORT);

    appServer(SERVER_CONFIG);
} catch (e) {
    logger(`AppServer: Instantiation error \n${e}`, 'err');
}
try {
    ioWrapper(server, config);
} catch (e) {
    logger(`ioWrapper: Instantiation error \n${e}`, 'err');
}
