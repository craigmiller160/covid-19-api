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
const DEFAULT_START_DATE = moment('2020-01-01').toDate();
const DEFAULT_END_DATE = moment('2022-12-31').toDate();

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

const getTotalsForRange = async (startDate = DEFAULT_START_DATE, endDate = DEFAULT_END_DATE, sortKey = SORT_KEY_TOTAL_CASES, sortOrder = SORT_ORDER_DESC) => {
    const sort = getSort(sortKey, sortOrder);
    const query = {
        // TODO add filter to exclude anything without the two fields we care about
        date: {
            '$in': [
                startDate,
                endDate
            ]
        }
    };
    const startDateFormatted = moment(startDate).format('YYYY-MM-DD');
    const endDateFormatted = moment(endDate).format('YYYY-MM-DD');
    try {
        const data = await connect(async (db) =>
            await db.collection(COLLECTION)
                .find(query)
                .sort(sort)
                .toArray()
        );
        console.log(data instanceof Array); // TODO delete this
        const formattedData = data.reduce((acc, record) => {
            const dateFormatted = moment(record.date).format('YYYY-MM-DD');
            const startTotalCases = dateFormatted === startDateFormatted ? record.totalCases : undefined;
            const endTotalCases = dateFormatted === endDateFormatted ? record.totalCases : undefined;
            const startTotalDeaths = dateFormatted === startDateFormatted ? record.totalDeaths : undefined;
            const endTotalDeaths = dateFormatted === endDateFormatted ? record.totalDeaths : undefined;
            let calculations = {};
            if (dateFormatted === startDateFormatted) {
                calculations = {
                    startTotalCases,
                    startTotalDeaths
                };
            } else if (dateFormatted === endDateFormatted) {
                calculations = {
                    endTotalCases,
                    endTotalDeaths
                };
            }

            if (acc[record.location]) {
                return {
                    ...acc,
                    [record.location]: {
                        ...acc[record.location],
                        ...calculations,
                    }
                };
            }

            return {
                ...acc,
                [record.location]: calculations
            };
        }, {});
        return formattedData;
    } catch (ex) {
        throw new TraceError(`Error getting totals for range: ${startDate} ${endDate}`, ex);
    }
};

module.exports = {
    getCountryHistoricalData,
    getTotalsForRange
};