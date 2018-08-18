'use strict';
//@flow

const fs = require('fs');
jest.mock('fs');
//$FlowFixMe
fs.readFile = jest.fn((path, callback) => callback && callback(null, new Buffer('test content')));

const read = require('../read');

afterEach(() => {
    jest.clearAllMocks();
});

describe('read file tests', () => {
    test('reads the file', () => {
        return read('/blah')
        .then(v => {
            expect(v).toEqual('test content');
            expect(fs.readFile.mock.calls).toEqual([
                ['/blah', expect.anything()],
            ]);
        });
    });
});

