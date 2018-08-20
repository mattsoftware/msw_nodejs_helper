'use strict';
//@flow
/*:: import type { JestMockT } from 'jest' */

const read/*:JestMockT*/ = require('../read');
jest.mock('../read');

const fs = require('fs');
jest.mock('fs');
//$FlowFixMe
fs.writeFile = jest.fn((path, content, callback) => callback && callback(null));

const write = require('../write');

afterEach(() => {
    jest.clearAllMocks();
});

describe('write file tests', () => {
    test('writes the file', () => {
        return write('/blah', 'content')
        .then(v => {
            expect(v).toBe(true);
            expect(read.mock.calls).toEqual([
                ['/blah'],
            ]);
            expect(fs.writeFile.mock.calls).toEqual([
                ['/blah', 'content', expect.anything()],
            ]);
        });
    });

    test('does not write the file if the content is the same', () => {
        read.mockImplementationOnce(path => Promise.resolve('test content'));
        return write('/blah', 'test content')
        .then(v => {
            expect(v).toBe(false);
            expect(read.mock.calls).toEqual([
                ['/blah'],
            ]);
            expect(fs.writeFile.mock.calls).toEqual([]);
        });
    });

    test('writes the file if the read throws an error', () => {
        read.mockImplementationOnce(path => Promise.resolve('oh oh'));
        return write('/blah', 'content')
        .then(v => {
            expect(v).toBe(true);
            expect(fs.writeFile.mock.calls).toEqual([
                ['/blah', 'content', expect.anything()],
            ]);
        });
    });
});

