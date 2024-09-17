import io from 'socket.io-client';

/**
 * 
 * @param {string} event 
 * @param {*} stateCallback - state setter
 * @param {*} componentState - react current state
 * @param {object} config - socket IO config 
 */
const getFeatures = (event = 'featureToggleUpdate', stateCallback, componentState, config) => {
    // TODO: add error boundary, to ensure multiple listeners are not started
    const { isSubscribed } = componentState;
    if (!isSubscribed) {
        //  Step 3: Hook into socketIO to listen for updates
        const { endPointUrl, options } = config;
        const socket = io(endPointUrl, options);

        socket.on(event, (data) => {
            /** Change to use hook */
            // update stuff based on the example
            stateCallback({
                ...componentState,
                config: {
                    featureToggle: data.featureToggle,
                    isExperimentalEnabled: false,
                },
                // handler for multiple listeners
                isSubscribed: true
            });
        });
    }

};

export default getFeatures;