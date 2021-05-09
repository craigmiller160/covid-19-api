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

const SORT_KEY_TOTAL_CASES = 'totalCases';
const SORT_KEY_TOTAL_DEATHS = 'totalDeaths';
const SORT_ORDER_ASC = 'asc';
const SORT_ORDER_DESC = 'desc';

const getSort = (sortKey, sortOrder) => {
	let order;
	switch (sortOrder) {
		case SORT_ORDER_ASC:
			order = 1;
			break;
		case SORT_ORDER_DESC:
		default:
			order = -1;
			break;
	}

	return {
		[sortKey]: order
	};
};

const bumpMissingDataElements = (data, sortKey) => {
	if (!sortKey) {
		return data;
	}
	const splitData = data.reduce(
		(acc, element) => {
			if (
				element[sortKey] &&
				!isNaN(element[sortKey]) &&
				element[sortKey] !== Infinity
			) {
				acc[0].push(element);
			} else {
				acc[1].push(element);
			}
			return acc;
		},
		[[], []]
	);
	return [...splitData[0], ...splitData[1]];
};

module.exports = {
	SORT_KEY_TOTAL_CASES,
	SORT_KEY_TOTAL_DEATHS,
	SORT_ORDER_DESC,
	SORT_ORDER_ASC,
	getSort,
	bumpMissingDataElements
};
