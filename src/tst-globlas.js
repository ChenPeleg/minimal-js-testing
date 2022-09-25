
export class MatchError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MatchError';
    }
}

const Matcher = (value) => ({
    toBe(match) {
        if (this.value === match) { return }
        throw new MatchError(`${value} is not equal to ${match}`)
    }
})
globalThis.it = (desctiption, test) => {
    allTests.push(desctiption, test);
}
globalThis.describe = (desctiption, tests) => {
    tests();
}
globalThis.expect = (value) => {
    return Matcher(value);
}
export const allTests = []