const rawData = require('./rawCountryHistoryData.json');
const moment = require('moment');

const formattedData = rawData.records
    .map((record) => ({
        location: record.countriesAndTerritories,
        newCases: parseInt(record.cases),
        newDeaths: parseInt(record.deaths),
        date: moment(record.dateRep, 'DD/MM/YYYY').toDate()
    }))
    .sort((rec1, rec2) => rec1.location.localeCompare(rec2.location));

module.exports = formattedData;