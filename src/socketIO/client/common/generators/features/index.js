import React, { Fragment } from "react";

/**
 * Generator for UI based on features
 * @param {string} title 
 * @param {array} features 
 * @returns 
 */
const getFeatureSet = (title, features = []) => {
    const featureSet = features?.length > 0 && features?.map((item) => {
        const { featureName, isExperimental, isEnabled } = item;
        return <Fragment>{title}
            <ul key={featureName.toString()}>
                <li>featureName: {featureName}</li>
                <li>isExperimental:{isExperimental.toString()}</li>
                <li>isEnabled: {isEnabled.toString()}</li >
            </ul>
        </Fragment>
    });
    return featureSet;
};

export default getFeatureSet;