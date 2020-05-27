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

const setCountryList = async (countryList) => {
    try {
        await connect(async (db) => {
            await db.collection(COLLECTION)
                .deleteMany();
            await db.collection(COLLECTION)
                .insertMany(countryList);
        });
    } catch (ex) {
        throw new TraceError('Error setting country list', ex);
    }
};

module.exports = {
    getCountryList,
    setCountryList
};