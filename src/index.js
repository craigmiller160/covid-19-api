const startExpress = require('./express');
const { cloudConfig } = require('@craigmiller160/covid-19-config-mongo');

console.log('Starting application');
cloudConfig.init()
    .then(startExpress)
    .catch((ex) => {
        console.log('Critical error starting application');
        console.log(ex);
    });