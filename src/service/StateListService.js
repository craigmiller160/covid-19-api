const { connect } = require('../mongo');
const TraceError = require('trace-error');

const COLLECTION = 'states';

const getStateList = async () => {
    const sort = { name: 1 };
    try {
        return await connect(async (db) =>
            db.collection(COLLECTION)
                .find()
                .sort(sort)
                .toArray()
        );
    } catch (ex) {
        throw new TraceError('Error getting state list', ex);
    }
};

module.exports = {
    getStateList
};