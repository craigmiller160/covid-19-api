
const SORT_KEY_TOTAL_CASES = 'totalCases';
const SORT_KEY_TOTAL_DEATHS = 'totalDeaths';
const SORT_KEY_CASES_PER_MILLION = 'totalCasesPerMillion';
const SORT_KEY_DEATHS_PER_MILLION = 'totalDeathsPerMillion';
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
    const splitData = data
        .reduce((acc, element) => {
            if (element[sortKey] && !isNaN(element[sortKey]) && element[sortKey] !== Infinity) {
                acc[0].push(element);
            } else {
                acc[1].push(element);
            }
            return acc;
        },[[],[]]);
    return [
        ...splitData[0],
        ...splitData[1]
    ];
};

module.exports = {
    SORT_KEY_TOTAL_CASES,
    SORT_KEY_TOTAL_DEATHS,
    SORT_ORDER_DESC,
    SORT_ORDER_ASC,
    getSort,
    bumpMissingDataElements
}