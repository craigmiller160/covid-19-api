const { connect } = require('../mongo');
const TraceError = require('trace-error');
const moment = require('moment');

const COLLECTION = 'state_history';

const getStateHistoricalData = async (stateName, startDate = moment('1970-01-01'), endDate = moment('2100-01-01')) => {
    const query = { location: stateName };
    const sort = { date: -1 };
    try {
        const data = await connect(async (db) =>
            await db.collection(COLLECTION)
                .find(query)
                .sort(sort)
                .toArray()
        );
        return data
            .filter((entry) => {
                const date = moment(entry.date);
                return date.diff(startDate) >= 0 && date.diff(endDate) <= 0;
            })
            .map((entry) => ({
                ...entry,
                date: moment(entry.date).format('YYYY-MM-DD')
            }));
    } catch (ex) {
        throw new TraceError(`Error getting historical data for state ${stateName}`, ex);
    }
};

const setStateHistoricalData = async (stateData) => {
    try {
        await connect(async (db) => {
            await db.collection(COLLECTION)
                .deleteMany();
            await db.collection(COLLECTION)
                .insertMany(stateData);
        });
    } catch (ex) {
        throw new TraceError('Error setting state historical data', ex);
    }
};

module.exports = {
    getStateHistoricalData,
    setStateHistoricalData
};