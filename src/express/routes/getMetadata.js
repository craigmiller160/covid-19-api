const { getMetadata } = require('../../service/MetadataService');

const createRoute = (app) => {
    app.get('/metadata', async (req, res, next) => {
        try {
            const data = await getMetadata();
            res.json(data);
        } catch (ex) {
            next({
                error: ex,
                message: 'Error getting metadata'
            });
        }
    });
};

module.exports = createRoute;