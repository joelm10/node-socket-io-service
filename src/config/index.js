export const  exampleProps = {
    endPointUrl: 'http://localhost:9191',
    options: {},
    delayTime: 3000
};

export const defaultConfig = {
    delayTime: 2000,
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