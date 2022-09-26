function addOne(a) {
    return a + 1;
}
function caller(fn) {
    return fn(3);
}

function spy(fn) {
    const calls = [];
    function f(...args) {
        calls.push(args[0]);
        return fn(...args);
    }
    f.calls = calls;
    return f;
}

describe('Testing functions', () => {
    it('The caller function should call addOne with "3"', () => {
        const adderSpy = spy(addOne);
        caller(adderSpy);
        expect(adderSpy.calls[0]).toBe(3);
    });
    it('addOne function should have been called 2 times', () => {
        const adderSpy = spy(addOne);
        caller(adderSpy);
        caller(adderSpy);
        expect(adderSpy.calls.length).toBe(2);
    });
});
