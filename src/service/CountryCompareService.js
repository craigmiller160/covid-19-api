const { connect } = require('@craigmiller160/covid-19-config-mongo');
const TraceError = require('trace-error');
const moment = require('moment');

const COLLECTION = 'country_compare';

const getCountryCompareData = async () => {
    return connect(async (db) =>
        await db.collection(COLLECTION)
            .find()
            .toArray()
    );
};

module.exports = {
    COLLECTION,
    getCountryCompareData
};
