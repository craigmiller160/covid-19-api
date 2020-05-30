const startExpress = require('./express');
const { cloudConfig, logger } = require('@craigmiller160/covid-19-config-mongo');

logger.info('Starting application');
cloudConfig.init()
    .then(startExpress)
    .catch((ex) => {
        logger.error('Critical error starting application');
        logger.error(ex);
    });