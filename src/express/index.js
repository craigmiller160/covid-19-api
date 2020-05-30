const express = require('express');
const { applyStartMiddleware, applyEndMiddleware } = require('./middleware');
const getCountryHistoricalData = require('./routes/getCountryHistoricalData');
const getCountriesRoute = require('./routes/getCountries');
const getMetadata = require('./routes/getMetadata');
const getStatesRoute = require('./routes/getStates');
const getCountryCurrentData = require('./routes/getCountryCurrentData');
const getStateHistoricalData = require('./routes/getStateHistoricalData');
const getStateCurrentData = require('./routes/getStateCurrentData');
const { logger } = require('@craigmiller160/covid-19-config-mongo');

const app = express();
const port = process.env.PORT;

applyStartMiddleware(app);

getCountryHistoricalData(app);
getCountriesRoute(app);
getMetadata(app);
getStatesRoute(app);
getCountryCurrentData(app);
getStateHistoricalData(app);
getStateCurrentData(app);

applyEndMiddleware(app);

const startExpressServer = () => {
    app.listen(port, () => logger.info(`Express server running on port ${port}`));
};

module.exports = startExpressServer;