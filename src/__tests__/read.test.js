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

    test('reads a text file', () => {
        return read('/blah', 'text')
        .then(v => {
            expect(v).toEqual('test content');
            expect(fs.readFile.mock.calls).toEqual([
                ['/blah', expect.anything()],
            ]);
        });
    });

    test('reads a binary file', () => {
        return read('/blah', 'binary')
        .then(v => {
            expect(v).toEqual(Buffer.from('test content'));
            expect(fs.readFile.mock.calls).toEqual([
                ['/blah', expect.anything()],
            ]);
        });
    });

    test('reads a json file', () => {
        fs.readFile.mockImplementationOnce((path, callback) => callback && callback(null, new Buffer('{"test":"content"}')));
        return read('/blah', 'json')
        .then(v => {
            expect(v).toEqual({"test": "content"});
            expect(fs.readFile.mock.calls).toEqual([
                ['/blah', expect.anything()],
            ]);
        });
    });

    test('throws on bad json', () => {
        return read('/blah', 'json')
        .then(v => expect(true).toBe(false))
        .catch(err => {
            expect(err).toEqual(new SyntaxError("Unexpected token e in JSON at position 1"));
            expect(fs.readFile.mock.calls).toEqual([
                ['/blah', expect.anything()],
            ]);
        });
    });
});

