//@format

const afp = require('../afp');
const sleep = require('../sleep');

expect.extend({
    toBeWithinRange(received, floor, ceiling) {
        const pass = received >= floor && received <= ceiling;
        if (pass) {
            return {
                message: () => `expected ${received} not to be within range ${floor} - ${ceiling}`,
                pass: true,
            };
        } else {
            return {
                message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
                pass: false,
            };
        }
    },
});

describe('afp sequence tests', () => {
    test('empty tests', () => {
        const test = [];
        const now = new Date();
        return afp(test)
            .then(v => v.sequence())
            .then(v => expect(v).toEqual([]))
            .then(v => expect(new Date() - now).toBeWithinRange(0, 100));
    });
    test('some sleeps tests', () => {
        jest.setTimeout(10000);
        const test = [() => sleep(4000, 'One'), () => sleep(2000, 'Two'), () => sleep(3000, 'Three')];
        const now = new Date();
        return afp(test)
            .then(v => v.sequence())
            .then(v => expect(v).toEqual(['One', 'Two', 'Three']))
            .then(v => expect(new Date() - now).toBeWithinRange(8900, 9100));
    });
});

describe('afp delay tests', () => {
    test('empty tests', () => {
        const test = [];
        const now = new Date();
        return afp(test)
            .then(v => v.delay(1500))
            .then(v => expect(v).toEqual([]))
            .then(v => expect(new Date() - now).toBeWithinRange(0, 100));
    });
    test('some sleeps tests', () => {
        jest.setTimeout(15000);
        const test = [() => sleep(4000, 'One'), () => sleep(2000, 'Two'), () => sleep(3000, 'Three')];
        const now = new Date();
        return afp(test)
            .then(v => v.delay(1500))
            .then(v => expect(v).toEqual(['One', 'Two', 'Three']))
            .then(v => expect(new Date() - now).toBeWithinRange(13400, 13600));
    });
});

describe('afp all tests', () => {
    test('empty tests', () => {
        const test = [];
        const now = new Date();
        return afp(test)
            .then(v => v.all())
            .then(v => expect(v).toEqual([]))
            .then(v => expect(new Date() - now).toBeWithinRange(0, 100));
    });
    test('some sleeps tests', () => {
        const test = [() => sleep(4000, 'One'), () => sleep(2000, 'Two'), () => sleep(3000, 'Three')];
        const now = new Date();
        return afp(test)
            .then(v => v.all())
            .then(v => expect(v).toEqual(['One', 'Two', 'Three']))
            .then(v => expect(new Date() - now).toBeWithinRange(3900, 4100));
    });
});
