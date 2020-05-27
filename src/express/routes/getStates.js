const { getStateList } = require('../../service/StateListService');
const { US_LOCATION } = require('../../utils/globalConstants');

const createRoute = (app) => {
    app.get('/states', async (req, res, next) => {
        try {
            const stateList = await getStateList();
            res.json([US_LOCATION, ...stateList]);
        } catch (ex) {
            next({
                message: 'Error getting states list',
                error: ex
            });
        }
    });
};

module.exports = createRoute;