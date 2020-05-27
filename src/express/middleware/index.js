const cors = require('cors');
const bodyParser = require('body-parser');
const loggerMiddleware = require('./loggerMiddleware');
const errorMiddleware = require('./errorMiddleware');
const notFoundMiddleware = require('./notFoundMiddleware');

const applyStartMiddleware = (app) => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(loggerMiddleware);
};

const applyEndMiddleware = (app) => {
    app.use(notFoundMiddleware);
    app.use(errorMiddleware);
};

module.exports = {
    applyStartMiddleware,
    applyEndMiddleware
};