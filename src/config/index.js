export const  exampleProps = {
    endPointUrl: 'http://localhost:9191',
    options: {},
    delayTime: 4500
};

export const defaultConfig = {
    featureToggle: {
        features: [
            {
                "featureName": "sampleWrapper",
                "isExperimental": false,
                "isEnabled": true
            },
            {
                "featureName": "tabWrapper",
                "isExperimental": false,
                "isEnabled": true
            },
            {
                "featureName": "listWrapper",
                "isExperimental": true,
                "isEnabled": false
            }
        ]
    }
};