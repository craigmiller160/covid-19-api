const { getAllCountryCurrentData } = require('../../service/CountryCurrentService');

const createRoute = (app) => {
    app.get('/countries/current', async (req, res, next) => {
        const sortKey = req.query.sortKey || undefined;
        const sortOrder = req.query.sortOrder || undefined;

        try {
            const data = await getAllCountryCurrentData(sortKey, sortOrder);
            res.json(data);
        } catch (ex) {
            next({
                message: 'Error getting country current data',
                error: ex
            });
        }
    });
}

module.exports = createRoute;