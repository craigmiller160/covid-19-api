const { connect } = require('../mongo');
const TraceError = require('trace-error');
const { SORT_KEY_TOTAL_CASES, SORT_ORDER_DESC, getSort, bumpMissingDataElements } = require('./sortUtils');

const COLLECTION = 'country_current';

const getAllCountryCurrentData = async (sortKey = SORT_KEY_TOTAL_CASES, sortOrder = SORT_ORDER_DESC) => {
    const sort = getSort(sortKey, sortOrder);
    try {
        const result = await connect(async (db) =>
            await db.collection(COLLECTION)
                .find()
                .sort(sort)
                .toArray()
        );
        return bumpMissingDataElements(result, sortKey);
    } catch (ex) {
        throw new TraceError('Error getting all country current data', ex);
    }
};

const setCountryCurrentData = async (countryData) => {
    try {
        await connect(async (db) => {
            await db.collection(COLLECTION)
                .deleteMany();
            await db.collection(COLLECTION)
                .insertMany(countryData);
        });
    } catch (ex) {
        throw new TraceError('Error setting current country data', ex);
    }
};

module.exports = {
    getAllCountryCurrentData,
    setCountryCurrentData
};