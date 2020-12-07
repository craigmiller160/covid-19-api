/*
 *     covid-19-api
 *     Copyright (C) 2020 Craig Miller
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const express = require('express');
const { applyStartMiddleware, applyEndMiddleware } = require('./middleware');
const getCountryHistoricalData = require('./routes/getCountryHistoricalData');
const getCountriesRoute = require('./routes/getCountries');
const getMetadata = require('./routes/getMetadata');
const getStatesRoute = require('./routes/getStates');
const getCountryCurrentData = require('./routes/getCountryCurrentData');
const getStateHistoricalData = require('./routes/getStateHistoricalData');
const healthcheck = require('./routes/healthcheck');
const getStateCurrentData = require('./routes/getStateCurrentData');
const { logger } = require('@craigmiller160/covid-19-config-mongo');
const tlsProps = require('./prepareTlsProps');
const https = require('https');

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
healthcheck(app);

applyEndMiddleware(app);

const startExpressServer = () => {
    const server = https.createServer(tlsProps, app);
    server.listen(port, () => logger.info(`Express server running on port ${port}`));
};

module.exports = startExpressServer;