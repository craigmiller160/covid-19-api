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

process.env.LOGGER_LEVEL = 'debug';

beforeAll(async () => {
	process.env.MONGO_USER = 'user';
	process.env.MONGO_PASSWORD = 'password';
	process.env.MONGO_HOST = '127.0.0.1';
	process.env.MONGO_AUTH_DB = 'jest_test';
	process.env.MONGO_PORT = '45957';
	process.env.MONGO_DATABASE = 'jest';
	process.env.ACTIVE_PROFILE = 'test';
	process.env.USE_CONFIG_SERVER = 'false';
});
