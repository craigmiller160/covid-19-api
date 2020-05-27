const rawData = require('./rawStateHistoryData.json');
const moment = require('moment');

const formattedData = rawData.map((record) => ({
    date: moment(record.date, 'YYYYMMDD').toDate(),
    newCases: record.positiveIncrease || 0,
    newDeaths: record.deathIncrease || 0,
    location: `${record.state}`
}));

module.exports = formattedData;