'use strict';
//@flow strict

const fs = require('fs');
jest.mock('fs');
//$FlowFixMe
fs.readFile = jest.fn((path, callback) => callback && callback(null, Buffer.from('test content')));

const read = require('../read');

afterEach(() => {
    jest.clearAllMocks();
});

describe('read file tests', () => {
    test('reads the file', () => {
        return read('/blah')
        .then(v => {
            expect(v).toEqual('test content');
            //$FlowFixMe
            expect(fs.readFile.mock.calls).toEqual([
                ['/blah', expect.anything()],
            ]);
        });
    });

    test('reads a text file', () => {
        return read('/blah', 'text')
        .then(v => {
            expect(v).toEqual('test content');
            //$FlowFixMe
            expect(fs.readFile.mock.calls).toEqual([
                ['/blah', expect.anything()],
            ]);
        });
    });

    test('reads a binary file', () => {
        return read('/blah', 'binary')
        .then(v => {
            expect(v).toEqual(Buffer.from('test content'));
            //$FlowFixMe
            expect(fs.readFile.mock.calls).toEqual([
                ['/blah', expect.anything()],
            ]);
        });
    });

    test('reads a json file', () => {
        //$FlowFixMe
        fs.readFile.mockImplementationOnce((path, callback) => callback && callback(null, Buffer.from('{"test":"content"}')));
        return read('/blah', 'json')
        .then(v => {
            expect(v).toEqual({"test": "content"});
            //$FlowFixMe
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
            //$FlowFixMe
            expect(fs.readFile.mock.calls).toEqual([
                ['/blah', expect.anything()],
            ]);
        });
    });

    test('reads a csv file', () => {
        //$FlowFixMe
        fs.readFile.mockImplementationOnce((path, callback) => callback && callback(null, Buffer.from('one,two,three\nfour,five,six')));
        return read('/blah', 'csv')
        .then(v => {
            expect(v).toEqual([{"one": "four", "two": "five", "three": "six"}]);
            //$FlowFixMe
            expect(fs.readFile.mock.calls).toEqual([
                ['/blah', expect.anything()],
            ]);
        });
    });

    test('throws on a bad csv', () => {
        //$FlowFixMe
        fs.readFile.mockImplementationOnce((path, callback) => callback && callback(null, Buffer.from('"one, two')));
        return read('/blah', 'csv')
        .catch(e => {
            expect(e).toEqual(new Error('Quote Not Closed: the parsing is finished with an opening quote at line 1'));
            return false;
        })
        .then(v => {
            expect(v).toEqual(false);
            //$FlowFixMe
            expect(fs.readFile.mock.calls).toEqual([
                ['/blah', expect.anything()],
            ]);
        });
    });

    test('csv parse does not throw on bad column count', () => {
        //$FlowFixMe
        fs.readFile.mockImplementationOnce((path, callback) => callback && callback(null, Buffer.from('one,two,three\nfour,five,six\nseven,eight')));
        return read('/blah', 'csv')
        .then(v => {
            expect(v).toEqual([{"one": "four", "two": "five", "three": "six"}, {"one": "seven", "two": "eight"}]);
            //$FlowFixMe
            expect(fs.readFile.mock.calls).toEqual([
                ['/blah', expect.anything()],
            ]);
        });
    });

});

