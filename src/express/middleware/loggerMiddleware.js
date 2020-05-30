const qs = require('qs');
const { logger } = require('@craigmiller160/covid-19-config-mongo');

const loggerMiddleware = (req, res, next) => {
    const request = `${req.method} ${req.path}?${qs.stringify(req.query)}`
    logger.debug(`Received: ${request}`);
    res.on('finish', () => {
        logger.info(`${res.statusCode} ${request}`);
    });
    next();
};

module.exports = loggerMiddleware;