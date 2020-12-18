import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import {
    defaultConfig,
    exampleProps
} from '../../config/';

// sample components
import { HeaderWrapper, tabWrapper, listWrapper } from '../../reactComponents/index.js';

/**
 *  Example react Component to:
 *  -   connect to socketIO
 *  -   display data
 *  -   update feature toggle
 */


class ExampleSocketIO extends React.Component {
    constructor(props) {
        super(props)
        //  Step 1: Add feature toggle to top level compoent state
        this.state = {
            config: {
                featureToggle: { features: [] },
            },
            defaultConfig

        };
        // Use config, but allow for over-ride
        const { delayTime = 2000 } = defaultConfig;

        this.delay = delayTime;
    }
    /**
     * Step 2: Add it in CDM to kick off listener on react component render
     *         Add a call to socketIO to get new feature settings
     */
    componentDidMount() {
        // NOTE: This example has a 2 second delay. but should be set based on use case
        setInterval(() => { this.getFeatures() }, this.delay);
    }

    getFeatures() {
        //  Step 3: Hook into socketIO to listen for updates
        //  TODO: update example to use socketIO wrapper
        const { endPointUrl, options } = this.props;
        const socket = io(endPointUrl, options);
        socket.on('featureToggleUpdate', (data) => {
            // update stuff based on the example
            this.setState({
                ...this.state,
                config: {
                    featureToggle: data.featureToggle,
                    isExperimentalEnabled: false,
                },

            });
        });
    }
    /**
     * NOTE:    This is a Lift/shift from utils library
     *          It should be imported from /libs/featureToggles 
     */
    isFeatureEnabled = (feature, enableExperimental, featureSet = this.featureSet.features) => {
        const { isExperimentalEnabled } = this.state.config;
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

    getFeatureSet = (title, features) => {
        return features.map((item) => {
            return <React.Fragment>{title}
                <ul key={item.featureName.toString()}>
                    <li>featureName: {item.featureName}</li>
                    <li>isExperimental:{item.isExperimental.toString()}</li>
                    <li>isEnabled: {item.isEnabled.toString()}</li >
                </ul>
            </React.Fragment>;
        });
    }
    render() {
        const {
            config: {
                featureToggle: { features }
            },
            defaultConfig
        } = this.state;
        // Example content 
        const appName = 'Example of feature toggle setup';
        const defaultConfigObj = this.getFeatureSet('default:', defaultConfig.featureToggle.features);
        const updatedConfig = this.getFeatureSet('updated', features);

        const featureToggleData = (
            <div className="row">
                <div className="col-12">This example has a default configuration that will be updated from from socketIO data source after {this.delay}ms.<br />
                    <h4>Features include:</h4></div>

                {defaultConfigObj && <div className="col-6">{defaultConfigObj}</div>}
                {updatedConfig.length ? <div className="col-6">{updatedConfig}</div> : 'features not loaded yet...'}
            </div>
        );
        /**
         * ============ Below here is simple example react components    ============
         * Note Lines 128-137 for feature toggle check
         */
        // Enabled by default
        //  Step 5: For each component/feature, check if it is present using helper 
        const tabEnabled = features !== [] || this.isFeatureEnabled('tabEnabled', false, features);
        // Disabled for example, until update from socketIO
        const listEnabled = this.isFeatureEnabled('listWrapper', false, features);
        // Enabled by default
        const sampleWrapper = (
            <div className="card">
                <h1>No feature toggle used</h1>
                Sample content goes here. <br />This component does not use feature toggle.
            </div>
        );
        //  Step 6: put in a check for conditional rendering 
        const tabExample = tabEnabled && tabWrapper
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
        )
    }
}

// Rendering method
const rootNode = 'app';
const rootElement = document.getElementById(rootNode);

// Render to page
ReactDOM.render(<ExampleSocketIO {...exampleProps} />, rootElement);
