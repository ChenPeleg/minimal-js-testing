export const allTests = [];

const Matcher = (value) => ({
    toBe: (toMatch) =>
        value !== toMatch ? new Error(`${value} is not equal to ${toMatch}`) : true,
});

globalThis.it = (description, test) => allTests.push({ description, test });

globalThis.describe = (description, tests) => {
    console.log('\n', ' '.repeat(4) + description);
    tests();
};

globalThis.expect = (value) => {
    return Matcher(value);
};
