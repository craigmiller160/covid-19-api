/*
 *     covid-19-api
 *     Copyright (C) 2020 Craig Miller
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const { connect } = require('@craigmiller160/covid-19-config-mongo');
const TraceError = require('trace-error');
const moment = require('moment');

const COLLECTION = 'country_history';

const getCountryHistoricalDataQuery = (countryName, startDate, endDate) => {
    const query = {
        location: countryName ,
        date: {
            '$gte': startDate.toDate(),
            '$lte': endDate.toDate()
        }
    };
    const sort = { date: -1 };
    return connect(async (db) =>
        await db.collection(COLLECTION)
            .find(query)
            .sort(sort)
            .toArray()
    );
};

const formatDate = (record) => ({
    ...record,
    originalDate: record.date,
    date: moment(record.date).format('YYYY-MM-DD')
});

const getCountryHistoricalData = async (countryName, startDate = moment('1970-01-01'), endDate = moment('2100-01-01')) => {
    try {
        const data = await getCountryHistoricalDataQuery(countryName, startDate, endDate);
        return data.map(formatDate);
    } catch (ex) {
        throw new TraceError(`Error getting historical data for country ${countryName}`, ex);
    }
};

module.exports = {
    getCountryHistoricalData,
    COLLECTION
};
