const { connect } = require('@craigmiller160/covid-19-config-mongo');
const {
    COLLECTION,
    getCountryCompareData
} = require('../../src/service/CountryCompareService');

const compareData = [
    {
        location: 'USA',
        start: 10,
        end: 20
    },
    {
        location: 'Canada',
        start: 10,
        end: 20
    }
];

describe('CountryCompareService', () => {
    beforeAll(async () => {
        await connect(async (db) => {
            await db.collection(COLLECTION)
                .insertMany(compareData);
        });
    });

    afterAll(async () => {
        await connect(async (db) => {
            await db.collection(COLLECTION)
                .drop();
        });
    });

    it('getCountryCompareData', async () => {
        const result = await getCountryCompareData();
        expect(result).toEqual(compareData);
    });
});
