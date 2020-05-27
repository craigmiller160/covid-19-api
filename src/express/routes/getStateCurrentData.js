const { getAllStateCurrentData } = require('../../service/StateCurrentService');

// TODO need the per-capita calculations for this
const createRoute = (app) => {
    app.get('/states/current', async (req, res, next) => {
        const sortKey = req.query.sortKey || undefined;
        const sortOrder = req.query.sortOrder || undefined;

        try {
            const data = await getAllStateCurrentData(sortKey, sortOrder);
            res.json(data);
        } catch (ex) {
            next({
                message: 'Error getting state current data',
                error: ex
            });
        }
    });
};

module.exports = createRoute;