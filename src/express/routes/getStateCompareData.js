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

const { getStateCompareData } = require('../../service/StateCompareService');

const createRoute = (app) => {
	app.get('/states/compare', async (req, res, next) => {
		try {
			const data = await getStateCompareData();
			res.json(data);
		} catch (ex) {
			next({
				message: 'Error getting state compare data',
				error: ex
			});
		}
	});
};

module.exports = createRoute;
