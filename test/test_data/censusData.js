const rawData = require('./rawCensusData.json');

const formattedData = rawData.slice(1)
    .map((record) => ({
        population: record[0] ? parseInt(record[0]) : null,
        displayLocation: record[1]
    }));

module.exports = formattedData;