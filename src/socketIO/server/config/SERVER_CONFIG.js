//  TODO: Extricate to constants file
const SERVER_CONFIG = {
    BASE_URL: 'http://localhost',
    PORT: 9191,
    DATA_SET: {
        indexPage: __dirname + '/index.html',
        featureToggle: require('../../../../__mocks__/getFeatures/getFeatures.json')
    },
    ROUTES: [{ url: '/', handler: '' }]
};
module.exports = SERVER_CONFIG;
