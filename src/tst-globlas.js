export const allTests = [];

const Matcher = (value) => ({
    toBe: (match) =>
        value !== match ? new Error(`${value} is not equal to ${match}`) : true,
});

globalThis.it = (desctiption, test) => allTests.push(desctiption, test);

globalThis.describe = (desctiption, tests) => tests();

globalThis.expect = (value) => {
    return Matcher(value);
};
