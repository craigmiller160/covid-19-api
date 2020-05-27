
const errorMiddleware = (error, req, res, next) => {
    let errorPayload;
    const path = `${req.method} ${req.path}`;
    if (error instanceof Error) {
        console.log('Error', error);
        errorPayload = {
            status: 500,
            path,
            message: 'Error',
            exceptionMessage: error.message
        };
    } else {
        console.log(`Error: ${error.message}`, error.error);
        errorPayload = {
            status: error.status || 500,
            path,
            message: error.message,
            exceptionMessage: error.error ? error.error.message : ''
        }
    }

    res.status(errorPayload.status)
        .json(errorPayload);
};

module.exports = errorMiddleware;