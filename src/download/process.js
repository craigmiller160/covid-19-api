const downloadProcess = require('./index');

downloadProcess()
    .then(() => {
        console.log('Download completed successfully');
        process.exit(0);
    })
    .catch((ex) => {
        console.log('Error downloading data');
        console.log(ex);
        process.exit(1);
    });