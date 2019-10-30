//@flow strict

const rm = require('../rm');
const fs = require('fs');
jest.mock('fs');

afterEach(() => {
    jest.clearAllMocks();
});

describe('rm file tests', () => {
    test('unlinks a file', () => {
        //$FlowFixMe
        fs.unlink.mockImplementationOnce((path, callback) => callback && callback(null, 'yes'));
        return rm('/blah')
        .then(v => {
            expect(v).toEqual(true);
            //$FlowFixMe
            expect(fs.unlink.mock.calls).toEqual([
                ['/blah', expect.anything()],
            ]);
        });
    });

    test('errors trying to unlink a file', () => {
        //$FlowFixMe
        fs.unlink.mockImplementationOnce((path, callback) => callback && callback('oops', null));
        return rm('/blah')
        .then(v => {
            expect(v).toEqual(true);
            //$FlowFixMe
            expect(fs.unlink.mock.calls).toEqual([
                ['/blah', expect.anything()],
            ]);
        });
    });
});

