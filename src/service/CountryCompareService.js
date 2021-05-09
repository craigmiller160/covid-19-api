const { connect } = require('@craigmiller160/covid-19-config-mongo');
const TraceError = require('trace-error');

const COLLECTION = 'country_compare';

const getCountryCompareData = async () => {
	try {
		return await connect(
			async (db) => await db.collection(COLLECTION).find().toArray()
		);
	} catch (ex) {
		throw new TraceError('Error getting country compare data', ex);
	}
};

module.exports = {
	COLLECTION,
	getCountryCompareData
};
