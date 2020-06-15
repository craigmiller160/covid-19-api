const startExpress = require('./express');
const { cloudConfig, logger } = require('@craigmiller160/covid-19-config-mongo');

logger.info('Starting application');
startExpress();