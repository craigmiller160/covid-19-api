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

const stateList = require('../test_data/stateList');
const countryList = require('../test_data/countryList');
const countryHistoryData = require('../test_data/countryHistoryData');
const formattedCountryList = require('../test_data/formattedCountryList.json');
const formattedStateList = require('../test_data/formattedStateList.json');
const stateHistoryData = require('../test_data/stateHistoryData');
const censusData = require('../test_data/censusData');
const {
    addCountryDisplayLocation,
    addStateDisplayLocation,
    createCountryList,
    createStateList,
    combinePopulationData,
    calculatePerMillion,
    calculateGrandTotal,
    calculateHistoricalTotals,
    calculateWorldHistorical
} = require('download/calculateMoreData');
const states = require('utils/states');
const moment = require('moment');

const noPopulationStats = [
    'AS', 'GU', 'MP', 'VI'
];

describe('calculateMoreData', () => {
    it('calculateHistoricalTotals', () => {
        const result = calculateHistoricalTotals(countryHistoryData);
        let last = {};
        result.forEach((record) => {
            if (record.location === last.location) {
                expect(record.totalCases).toEqual(last.totalCases + record.newCases);
            }
            last = record;
        });
    });

    it('calculateGrandTotal', () => {
        const data = [
            { location: 'ABC', totalCases: 1000 },
            { location: 'ABC', totalCases: 50 },
            { location: 'ABC', totalCases: 2000, totalDeaths: 1, population: 1 },
            { location: 'DEF', totalCases: 24, totalDeaths: 2, population: 2 }
        ];

        const result = calculateGrandTotal(data);
        expect(result).toEqual([
            data[2],
            data[3]
        ]);
    });

    it('calculateWorldHistorical', () => {
        // TODO this whole test needs to be refactored to actually test something
        const countryHistorical = calculateHistoricalTotals(countryHistoryData);

        const dateGroups = countryHistorical.reduce((acc, entry) => {
            const formatted = moment(entry.date).format('YYYY-MM-DD');
            if (acc[formatted]) {
                acc[formatted].push(entry);
            } else {
                acc[formatted] = [entry];
            }
            return acc;
        }, {});
        console.log(dateGroups['2020-05-23'].length);
        console.log(dateGroups['2020-05-24'].length);
        const may24 = dateGroups['2020-05-24'];
        const may23 = dateGroups['2020-05-23'];
        const unique = may23.filter((entry) => {
            return !may24.find((rec) => rec.location === entry.location);
        });
        console.log(unique);

        // const result = calculateWorldHistorical(countryHistorical);
        // const match1 = result.find((entry) => moment(entry.date).month() === 4 && moment(entry.date).date() === 23);
        // console.log(match1);
        // const match2 = result.find((entry) => moment(entry.date).month() === 4 && moment(entry.date).date() === 24);
        // console.log(match2);
    });

    it('calculateDoubling', () => {
        throw new Error();
    });

    it('calculatePerMillion', () => {
        const data = [
            { totalCases: 500000, totalDeaths: 20000, population: 50000000 },
            { totalCases: 400000, totalDeaths: 10000, population: 500000000 }
        ];
        const result = calculatePerMillion(data);
        expect(result).toEqual([
            {
                ...data[0],
                totalCasesPerMillion: 10000,
                totalDeathsPerMillion: 400
            },
            {
                ...data[1],
                totalCasesPerMillion: 800,
                totalDeathsPerMillion: 20
            }
        ]);
    });

    it('combinePopulationData', () => {
        const result = combinePopulationData(stateHistoryData, censusData);
        stateHistoryData.forEach((record) => {
            const match = result.find((entry) => entry.location === record.location);
            expect(match).not.toBeUndefined();
            if (noPopulationStats.includes(match.location)) {
                expect(match.population).toBeUndefined();
            } else {
                const displayName = states[record.location];
                const censusMatch = censusData.find((entry) => entry.displayLocation === displayName);
                expect(censusMatch).not.toBeUndefined();
                const expectedPopulation = censusMatch.population;
                expect(match.population).toEqual(expectedPopulation);
            }
        });
    });

    it('createCountryList', () => {
        const result = createCountryList(countryHistoryData);
        countryHistoryData.forEach((record) => {
            const match = result.find((entry) => entry.location === record.location);
            expect(match).not.toBeUndefined();
            expect(match).toEqual({
                location: record.location,
                displayLocation: record.location.replace(/_/g, ' ')
            });
        });
    });

    it('createStateList', () => {
        const result = createStateList(stateHistoryData);
        stateHistoryData.forEach((record) => {
            const match = result.find((entry) => entry.location === record.location);
            expect(match).not.toBeUndefined();
            expect(match).toEqual({
                location: record.location,
                displayLocation: states[record.location]
            });
        });
    });

    it('addCountryDisplayLocation', () => {
        const result = addCountryDisplayLocation(countryList);
        expect(result).toEqual([
            {
                location: 'Afghanistan',
                displayLocation: 'Afghanistan'
            },
            {
                location: 'United_States_of_America',
                displayLocation: 'United States of America'
            },
            {
                location: 'Boznia and Herzegovina',
                displayLocation: 'Boznia and Herzegovina'
            },
            {
                location: 'China',
                displayLocation: 'China'
            }
        ])
    });

    it('addStateDisplayLocation', () => {
        const result = addStateDisplayLocation(stateList);
        expect(result).toEqual([
            {
                location: 'AK',
                displayLocation: 'Alaska'
            },
            {
                location: 'NJ',
                displayLocation: 'New Jersey'
            },
            {
                location: 'FL',
                displayLocation: 'Florida'
            },
            {
                location: 'AB',
                displayLocation: undefined
            }
        ]);
    });
});