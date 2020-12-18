/**
 *  Simple socketIO server demo
 *
 * TODO: Setup Winston file logger -> https://www.npmjs.com/package/winston
 */
//  Ref:    https://socket.io/docs/#Using-with-Express
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

//  TODO: Extricate to constants file
const SERVER_CONFIG = {
    BASE_URL: 'http://localhost',
    PORT: 9191,
    DATA_SET: {
        indexPage: __dirname + '/index.html',
        featureToggle: require('../../../__mocks__/getFeatures/getFeatures.json')
    },
    ROUTES: [{ url: '/', handler: '' }]
};

server.listen(SERVER_CONFIG.PORT);

//  ======== MOVE TO HELPER ========
/**
 * TODO: use winston here
 * @param {*} msg
 */
const logger = (msg, type) => {
    if (type === 'info') {
        console.info(`${type}: ${msg}`);
    }
    if (type === 'warn') {
        console.warn(`${type}: ${msg}`);
    }
    if (type === 'log') {
        console.log(`${type}: ${msg}`);
    }
};

/**
 * TODO: Write auth check
 */
const checkAuth = () => {
    return true;//Math.random() >= 0.5;
};
//  ======== MOVE TO HELPER ========

/**
 *  Express server to return a mock html file
 * @param {*} app
 */
const appServer = () => {
    logger('======== appServer start ========', 'info');
    logger(`======== appServer available at: ${SERVER_CONFIG.BASE_URL}:${SERVER_CONFIG.PORT} ========`, 'info');

    app.get('/', (req, res) => {
        logger(`======== appServer request on port: ${SERVER_CONFIG.PORT}`, 'info');
        res.sendFile(SERVER_CONFIG.DATA_SET.indexPage);
    });

    return app;
};

/**
 * SocketIO Wrapper handler
 */
const ioWrapper = () => {
    logger('ioWrapper', 'info');

    const featureToggle = SERVER_CONFIG.DATA_SET.featureToggle;
    // authorised request
    const isValidAuth = checkAuth();
    io.on('connection', socket => {
        logger(`==== Connection joined from:' ${socket.request.connection.remoteAddress}  ====`, 'info');
        //  TODO: Add Robust Auth mechanism
        if (isValidAuth) {
            socket.emit('featureToggleUpdate', { featureToggle });
        } else {
            socket.emit('featureToggleUpdate', { status: 401, auth: false });
        }
        socket.on('disconnect', reason => {
            logger(`Client disconnected. ]nDetails:\n ${reason}`, 'info');
        });
    });
};

const rulesEngine = () => {
    const featureToggleWithUpdated = { 
        // do stuff here
    }
    return featureToggleWithUpdated;

};

appServer();
ioWrapper();
