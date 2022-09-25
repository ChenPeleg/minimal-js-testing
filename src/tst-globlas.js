export const allTests = [];

const Matcher = (value) => ({
    toBe: (toMatch) => {
        if (value !== toMatch) {
            throw new Error(`${value} is not equal to ${toMatch}`);
        }
    },
});

globalThis.it = (description, test) => allTests.push({ description, test });

globalThis.describe = (description, tests) => {
    console.log('\n', ' '.repeat(4) + description);
    tests();
};

globalThis.expect = (value) => {
    return Matcher(value);
};
