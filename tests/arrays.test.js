const filterFunction = (arr) => arr.filter((el) => el > 5);
const mapFunction = (arr) => arr.map((el) => el + 1);

describe('Testing arrays', () => {
    it('filterFunction should filter arrays below 6', () => {
        const reuslt = filterFunction([8, 2, 7]);
        expect(reuslt.join() === [8, 7].join()).toBe(true);
    });
    it('mapFunction should add one to all numbers in array', () => {
        const reuslt = mapFunction([8, 2, 7]);
        expect(reuslt.join() === [9, 3, 8].join()).toBe(true);
    });
});
