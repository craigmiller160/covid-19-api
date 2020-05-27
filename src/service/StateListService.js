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

const setStateList = async (stateList) => {
    try {
        await connect(async (db) => {
            await db.collection(COLLECTION)
                .deleteMany();
            await db.collection(COLLECTION)
                .insertMany(stateList);
        });
    } catch (ex) {
        throw new TraceError('Error setting state list', ex);
    }
};

module.exports = {
    getStateList,
    setStateList
};