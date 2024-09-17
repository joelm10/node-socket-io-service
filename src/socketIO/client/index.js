import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import {
    exampleProps,
    defaultConfig as baseDefaultConfig
} from '../../config/';

// sample components
import { HeaderWrapper, tabWrapper, listWrapper } from '../../reactComponents/index.js';

import getFeatures from './common/socketIO/listener/index.js';
import getFeatureSet from './common/generators/features/index.js';
import isFeatureEnabled from './common/features/featuresEnabled/index.js';

/**
 *  Example react Component to:
 *  -   connect to socketIO
 *  -   display data
 *  -   update feature toggle
 */
const ExampleSocketIO = (props) => {
    //  Step 1: Add feature toggle to top level compoent state
    const initialState = {
        config: {
            featureToggle: {
                features: [],
            },
        },
        isSubscribed: false,
        defaultConfig: baseDefaultConfig,
        delayTime: props?.delayTime
    };

    const [displayState, setDisplayValues] = useState(initialState);

    /**
     * Step 2: Add it in CDM to kick off listener on react component render
     *         Add a call to socketIO to get new feature settings
     */
    useEffect(() => {
        try {
            const { delayTime } = displayState;
            // NOTE: This example has a 4500 second delay. but should be set based on use case
            setTimeout(() => {
                //  (event = 'featureToggleUpdate', stateCallback, componentState, config)
                getFeatures('featureToggleUpdate', setDisplayValues, displayState, props);
            }, delayTime);
        } catch (e) {
            console.log('err', e);
        }

    }, [delayTime]);

    const {
        config: {
            featureToggle: { features = [] }
        },
        defaultConfig,
        delayTime
    } = displayState;

    // Example content 
    const appName = 'Example of feature toggle setup';
    const defaultConfigObj = getFeatureSet('default:', defaultConfig.featureToggle.features);
    const updatedConfig = getFeatureSet('updated:', features);

    const featureToggleData = (
        <div className="row">
            <div className="col-12">This example has a default configuration that will be updated from from socketIO data source after {delayTime}ms.<br />
                <h4>Features include:</h4></div>

            {defaultConfigObj && <div className="col-6">{defaultConfigObj}</div>}
            {updatedConfig.length ? <div className="col-6">{updatedConfig}</div> : 'features not loaded yet...'}
        </div>
    );

    /**
     * ============ Below here is simple example react components    ============
     */
    // Enabled by default
    //  Step 5: For each component/feature, check if it is present using helper 
    const tabEnabled = features?.length === 0 || isFeatureEnabled('tabEnabled', false, features, displayState.config);
    // Disabled for example, until update from socketIO
    const listEnabled = isFeatureEnabled('listWrapper', false, features, displayState.config);
    // Enabled by default
    const sampleWrapper = (
        <div className="card">
            <h1>No feature toggle used</h1>
            Sample content goes here. <br />This component does not use feature toggle.
        </div>
    );

    //  Step 6: put in a check for conditional rendering 
    const tabExample = tabEnabled && tabWrapper;
    const listExample = listEnabled && listWrapper;

    const mainWrapper = (
        <main id="gel-main" role="main">
            <section className="container">
                {featureToggleData}
                {sampleWrapper}<br />
                {tabExample}<br />
                {listExample}
            </section>
        </main >
    )
    return (
        <React.Fragment>
            <HeaderWrapper appName={appName} />
            {mainWrapper}
        </React.Fragment >
    );
};

/**
 * Simple raw render, this usually would sit at core entrypoint of app, not in component
 */
// Rendering method
const rootNode = 'app';
const rootElement = document.getElementById(rootNode);

// Render to page
ReactDOM.render(<ExampleSocketIO {...exampleProps} />, rootElement);
