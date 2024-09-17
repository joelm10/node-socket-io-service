const logger = require('../../common/utils/logger');
const checkAuth = require('../../common/auth');

/**
 * SocketIO Wrapper handler
 */
const ioWrapper = (server, config) => {
    logger('======== ioWrapper start ========', 'info');
    const io = require('socket.io')(server);

    const featureToggle = config.DATA_SET.featureToggle;
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

module.exports = ioWrapper;