const qs = require('qs');

const loggerMiddleware = (req, res, next) => {
    const request = `${req.method} ${req.path}?${qs.stringify(req.query)}`
    console.log(`Received: ${request}`);
    res.on('finish', () => {
        console.log(`${res.statusCode} ${request}`);
    });
    next();
};

module.exports = loggerMiddleware;