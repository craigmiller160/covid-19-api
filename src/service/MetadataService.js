const { connect } = require('../mongo');
const TraceError = require('trace-error');
const moment = require('moment');

const COLLECTION = 'metadata';

const getMetadata = async () => {
    try {
        const data = await connect(async (db) =>
            await db.collection(COLLECTION)
                .findOne()
        );
        return {
            ...data,
            downloadDate: moment(data.downloadDate).format('YYYY-MM-DD HH:mm:ssZ')
        };
    } catch (ex) {
        throw new TraceError('Error getting metadata', ex);
    }
};

module.exports = {
    getMetadata
};