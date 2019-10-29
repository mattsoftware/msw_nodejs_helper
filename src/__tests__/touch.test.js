//@flow strict

const touch = require('../touch');
const fs = require('fs');
jest.mock('fs');

afterEach(() => {
    jest.clearAllMocks();
});
beforeEach(() => {
    //$FlowFixMe
    fs.utimes = jest.fn((path, timea, timeb, callback) => callback && callback('utimes not implimented'));
    //$FlowFixMe
    fs.open = jest.fn((path, access, callback) => callback && callback('open not implemented'));
    //$FlowFixMe
    fs.close = jest.fn((fd, callback) => callback && callback('close not implemented'));
});

describe('touch file tests', () => {
    test('touchs a file that doesnt exist', () => {
        //$FlowFixMe
        fs.open.mockImplementationOnce((path, access, callback) => callback && callback(null, 'fd'));
        //$FlowFixMe
        fs.close.mockImplementationOnce((fd, callback) => callback && callback(null));
        return touch('/blah')
        .then(v => {
            expect(v).toEqual(true);
            expect(fs.utimes.mock.calls).toEqual([
                ['/blah', expect.anything(), expect.anything(), expect.anything()]
            ]);
            expect(fs.open.mock.calls).toEqual([
                ['/blah', 'w', expect.anything()],
            ]);
            expect(fs.close.mock.calls).toEqual([
                ['fd', expect.anything()],
            ]);
        });
    });

    test('touchs a file that does exist', () => {
        //$FlowFixMe
        fs.utimes.mockImplementationOnce((path, timea, timeb, callback) => callback && callback(null));
        return touch('/blah')
        .then(v => {
            expect(v).toEqual(true);
            expect(fs.utimes.mock.calls).toEqual([
                ['/blah', expect.anything(), expect.anything(), expect.anything()]
            ]);
            expect(fs.open.mock.calls).toEqual([]);
            expect(fs.close.mock.calls).toEqual([]);
        });
    });

    test('error opening a file to be touched', () => {
        return touch('/blah')
        .then(v => expect(true).toEqual(false))
        .catch(v => {
            expect(v).toEqual('open not implemented');
            expect(fs.utimes.mock.calls).toEqual([
                ['/blah', expect.anything(), expect.anything(), expect.anything()]
            ]);
            expect(fs.open.mock.calls).toEqual([
                ['/blah', 'w', expect.anything()],
            ]);
            expect(fs.close.mock.calls).toEqual([]);
        });
    });

    test('opened a file, but for some reason failed to close it', () => {
        //$FlowFixMe
        fs.open.mockImplementationOnce((path, access, callback) => callback && callback(null, 'fd'));
        return touch('/blah')
        .then(v => expect(true).toEqual(false))
        .catch(v => {
            expect(v).toEqual('close not implemented');
            expect(fs.utimes.mock.calls).toEqual([
                ['/blah', expect.anything(), expect.anything(), expect.anything()]
            ]);
            expect(fs.open.mock.calls).toEqual([
                ['/blah', 'w', expect.anything()],
            ]);
            expect(fs.close.mock.calls).toEqual([
                ['fd', expect.anything()],
            ]);
        });
    });
});

