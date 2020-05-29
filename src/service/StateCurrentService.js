const { connect } = require('../mongo');
const TraceError = require('trace-error');
const { SORT_KEY_TOTAL_CASES, SORT_ORDER_DESC, getSort, bumpMissingDataElements } = require('./sortUtils');

const COLLECTION = 'state_current';

const getAllStateCurrentData = async (sortKey = SORT_KEY_TOTAL_CASES, sortOrder = SORT_ORDER_DESC) => {
    const sort = getSort(sortKey, sortOrder);
    try {
        const data = await connect(async (db) =>
            db.collection(COLLECTION)
                .find()
                .sort(sort)
                .toArray()
        );
        return bumpMissingDataElements(data, sortKey);
    } catch (ex) {
        throw new TraceError('Error getting all current state data', ex);
    }
};

module.exports = {
    getAllStateCurrentData
};