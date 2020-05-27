const startExpress = require('./express');
const { cloudConfig } = require('./config');

console.log('Starting application');
cloudConfig.init()
    .then(startExpress)
    .catch((ex) => {
        console.log('Critical error starting application');
        console.log(ex);
    });