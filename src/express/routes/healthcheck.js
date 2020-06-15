const { logger } = require('@craigmiller160/covid-19-config-mongo');

const createRoute = (app) => {
    app.get('/healthcheck', (req, res) => {
        logger.debug('Healthcheck received');
        res.send('Healthy');
    });
};

module.exports = createRoute;