/**
 * 
 * @param {string} feature 
 * @param {boolean} enableExperimental 
 * @param {array} featureSet 
 * @param {object} config 
 * @returns {array}
 */
const isFeatureEnabled = (feature, enableExperimental, featureSet = featureSet.features, config) => {
    const { isExperimentalEnabled = false } = config;
    //
    // return bool if name is In Array && isEnabled OR isExpermental item supported
    const isEnabled = featureSet.some((item) => {
        // feature in array
        const isFeaturePresent = item.featureName === feature;
        // is feature experimental role enabled- or overridden
        const enableExperimentalFeature = isExperimentalEnabled || enableExperimental;
        return isFeaturePresent && (item.isEnabled || (enableExperimentalFeature && item.isExperimental));
    });
    return isEnabled;
};

export default isFeatureEnabled;