const { getCountryList } = require('../../service/CountryListService');
const { WORLD_LOCATION } = require('../../utils/globalConstants');

const createRoute = (app) => {
    app.get('/countries', async (req, res, next) => {
        try {
            const countryList = await getCountryList();
            res.json([WORLD_LOCATION, ...countryList]);
        } catch (ex) {
            next({
                message: 'Error getting countries list',
                error: ex
            });
        }
    });
};

module.exports = createRoute;