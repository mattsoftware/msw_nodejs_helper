'use strict';
//@flow strict

const exists = require('../exists');
jest.mock('fs');
const fs = require('fs');
//$FlowFixMe
fs.stat = jest.fn((path, callback) => callback && callback(null, new fs.Stats()));

afterEach(() => {
    jest.clearAllMocks();
});

describe('file exists tests', () => {
    test('should return true if the file exists', () => {
        //$FlowFixMe
        fs.stat.mockImplementationOnce((path, callback) => callback && callback(null, true));
        exists('/path/to/file.test')
        .then(v => {
            expect(v).toBe(true);
            //$FlowFixMe
            expect(fs.stat.mock.calls).toEqual([
                ['/path/to/file.test', expect.anything()],
            ]);
        });
    });

    test('should return false if the file does not exist', () => {
        //$FlowFixMe
        fs.stat.mockImplementationOnce((path, callback) => callback && callback(new Error('does not exist'), null));
        exists('/path/to/file.test')
        .then(v => {
            expect(v).toBe(false);
            //$FlowFixMe
            expect(fs.stat.mock.calls).toEqual([
                ['/path/to/file.test', expect.anything()],
            ]);
        });
    });
});

