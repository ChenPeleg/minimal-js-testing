describe('Only simple tests', () => {
    it('Asserts that 8 is equal to 8', () => {
        expect(8).toBe(8);
    });
    it('Asserts that 7 is not equal to 8', () => {
        let seven = 7;
        expect(8 === seven).toBe(false);
    });
});
