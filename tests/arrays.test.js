const filterFunction = (arr) => arr.filter((el) => el > 5);
const mapFunction = (arr) => arr.filter((el) => el + 1);

describe('Testing arrays', () => {
    it('filtering works', () => {
        const reuslt = filterFunction([8, 2, 7]);
        expect(reuslt.join() === [8, 7].join()).toBe(true);
    });
    it('mapping works', () => {
        const reuslt = mapFunction([8, 2, 7]);
        expect(reuslt.join() === [9, 3, 5].join()).toBe(true);
    });
});
