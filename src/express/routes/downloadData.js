const spawn = require('cross-spawn');

const startDownloadPath = require.resolve('../../download/process');

let running = false;

const createRoute = (app) => {
    app.get('/download', async (req, res, next) => {
        if (running) {
            next({
                status: 400,
                message: 'Download is already running'
            });
            return;
        }

        try {
            running = true;
            const childProcess = spawn('node', [startDownloadPath], { stdio: 'inherit' });
            childProcess.on('close', (code) => {
                if (code === 0) {
                    res.sendStatus(204);
                } else {
                    next({
                        message: 'Error downloading data'
                    });
                }
                running = false;
            });
        } catch (ex) {
            running = false;
            next({
                message: 'Error downloading data',
                error: ex
            });
        }
    });
};

module.exports = createRoute;