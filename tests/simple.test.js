describe('Only simple tests', () => {
    it('assetrs that 8 is equalt to 8', () => {
        expect(8).toBe(8);
    });
    it('assetrs that 7 is not equalt to 8', () => {
        let seven = 7;
        expect(8 === seven).toBe(false);
    });
});
