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

const COLLECTION = 'metadata';

const getMetadata = async () => {
	try {
		const data = await connect(
			async (db) => await db.collection(COLLECTION).findOne()
		);
		return {
			...data,
			downloadDate: data
				? moment(data.downloadDate).format('YYYY-MM-DD HH:mm:ssZ')
				: null
		};
	} catch (ex) {
		throw new TraceError('Error getting metadata', ex);
	}
};

module.exports = {
	getMetadata
};
