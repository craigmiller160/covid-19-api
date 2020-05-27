const { getStateHistoricalData } = require('../../service/StateHistoricalService');
const { getCountryHistoricalData } = require('../../service/CountryHistoricalService');
const { US_LOCATION } = require('../../utils/globalConstants');
const moment = require('moment');

const getData = async (location, startDate, endDate) => {
    if (location === US_LOCATION) {
        return await getCountryHistoricalData(location, startDate, endDate);
    }

    return await getStateHistoricalData(location, startDate, endDate);
};

const createRoute = (app) => {
    app.get('/state/historical/:name?', async (req, res, next) => {
        const location = req.params.name || US_LOCATION;
        const startDate = req.query.startDate ? moment(req.query.startDate) : undefined;
        const endDate = req.query.endDate ? moment(req.query.endDate) : undefined;

        try {
            const data = await getData(location, startDate, endDate);
            res.json(data);
        } catch (ex) {
            next({
                message: 'Error getting state historical data',
                error: ex
            });
        }
    });
};

module.exports = createRoute;