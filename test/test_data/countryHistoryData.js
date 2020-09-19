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

const rawData = require('./rawCountryHistoryData.json');
const moment = require('moment');

const formattedData = rawData.records
    .map((record) => ({
        location: record.countriesAndTerritories,
        newCases: parseInt(record.cases),
        newDeaths: parseInt(record.deaths),
        date: moment(record.dateRep, 'DD/MM/YYYY').toDate()
    }))
    .sort((rec1, rec2) => rec1.location.localeCompare(rec2.location));

module.exports = formattedData;