const { connect } = require('../mongo');
const TraceError = require('trace-error');

const COLLECTION = 'countries';

const getCountryList = async () => {
    const sort = { name: 1 };
    try {
        return await connect(async (db) =>
            await db.collection(COLLECTION)
                .find()
                .sort(sort)
                .toArray()
        );
    } catch (ex) {
        throw new TraceError('Error getting country list', ex);
    }
};

module.exports = {
    getCountryList
};