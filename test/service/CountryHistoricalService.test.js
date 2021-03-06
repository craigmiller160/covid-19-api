/*
 *     covid-19-api
 *     Copyright (C) 2021 Craig Miller
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
const countryHistoryData = require('../__data__/countryHistoryData');
const {
    COLLECTION,
    getCountryHistoricalData,
    getTotalsForRange
} = require('../../src/service/CountryHistoricalService');
const moment = require('moment');

describe('CountryHistoricalService', () => {
    beforeAll(async () => {
        await connect(async (db) => {
            await db.collection(COLLECTION)
                .insertMany(countryHistoryData);
        });
    });

    afterAll(async () => {
        await connect(async (db) => {
            await db.collection(COLLECTION)
                .drop();
        });
    });

    it('getCountryHistoricalData', async () => {
        const country = 'USA';
        const startDate = moment('2020-01-22');
        const endDate = moment('2020-01-25');
        const expected = countryHistoryData
            .filter((record) => {
                const date = moment(record.date);
                return record.location === country &&
                    startDate.diff(date) <= 0 &&
                    endDate.diff(date) >= 0;
            })
            .map((record) => ({
                ...record,
                date: moment(record.date).format('YYYY-MM-DD')
            }))
            .reverse();
        const result = await getCountryHistoricalData(country, startDate, endDate);
        expect(result).toEqual(expected);
    });

    it('getTotalsForRange', async () => {
        const result = await getTotalsForRange(moment('2020-01-22'), moment('2020-01-28'));
        console.log(result); // TODO delete this
        throw new Error();
    });

    it('getTotalsForRange month out of range', () => {
        throw new Error();
    });
});