//@flow strict
///@format

const sleep = require('../sleep');

afterEach(() => {
    jest.clearAllMocks();
});

describe('sleep tests', () => {
    test('sleeps', () => {
        const start = new Date();
        return sleep(1000).then(v => {
            const now = new Date();
            expect(now - start).toBeGreaterThan(1000);
            expect(now - start).toBeLessThan(1100);
        });
    });

    test('long sleeps', () => {
        const start = new Date();
        return sleep(4000).then(v => {
            const now = new Date();
            expect(now - start).toBeGreaterThan(4000 - 10);
            expect(now - start).toBeLessThan(4400 + 1);
        });
    });
});
