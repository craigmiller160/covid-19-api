const { WORLD_LOCATION } = require('../../utils/globalConstants');
const { getCountryHistoricalData } = require('../../service/CountryHistoricalService');
const moment = require('moment');

const createRoute = (app) => {
    app.get('/country/historical/:name?', async (req, res, next) => {
        const location = req.params.name || WORLD_LOCATION.location;
        const startDate = req.query.startDate ? moment(req.query.startDate) : undefined;
        const endDate = req.query.endDate ? moment(req.query.endDate) : undefined;

        try {
            const data = await getCountryHistoricalData(location, startDate, endDate);
            res.json(data);
        } catch (ex) {
            next({
                message: 'Error getting country historical data',
                error: ex
            });
        }
    });
};

module.exports = createRoute;