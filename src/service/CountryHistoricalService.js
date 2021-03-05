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
const { SORT_KEY_TOTAL_CASES, SORT_ORDER_DESC, getSort, bumpMissingDataElements } = require('./sortUtils');

const COLLECTION = 'country_history';

const getCountryHistoricalData = async (countryName, startDate = moment('1970-01-01'), endDate = moment('2100-01-01')) => {
    const query = { location: countryName };
    const sort = { date: -1 };
    try {
        const data = await connect(async (db) =>
            await db.collection(COLLECTION)
                .find(query)
                .sort(sort)
                .toArray()
        );
        return data
            .filter((entry) => {
                const date = moment(entry.date);
                return date.diff(startDate) >= 0 && date.diff(endDate) <= 0;
            })
            .map((entry) => ({
                ...entry,
                date: moment(entry.date).format('YYYY-MM-DD')
            }));
    } catch (ex) {
        throw new TraceError(`Error getting historical data for country ${countryName}`, ex);
    }
};

const getTotalsForRange = async (startDate, endDate, sortKey = SORT_KEY_TOTAL_CASES, sortOrder = SORT_ORDER_DESC) => {
    const sort = getSort(sortKey, sortOrder);
    const query = {
        date: {
            '$in': [
                startDate,
                endDate
            ]
        }
    };
    try {
        const data = await connect(async (db) =>
            await db.collection(COLLECTION)
                .find(query)
                .sort(sort)
                .toArray()
        );
        return bumpMissingDataElements(data, sortKey);
    } catch (ex) {
        throw new TraceError(`Error getting totals for range: ${startDate} ${endDate}`, ex);
    }
};

module.exports = {
    getCountryHistoricalData,
    getTotalsForRange
};