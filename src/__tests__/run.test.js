'use strict';
//@flow

const run = require('../run');
const child_process = require('child_process');
jest.mock('child_process');
const { EventEmitter } = require('events');
const {inherits} = require('util');
inherits(child_process.ChildProcess, EventEmitter);

afterEach(() => {
    jest.clearAllMocks();
});

describe('Tests the run function', () => {
    test('calls spawn and returns stdout and stderr', () => {
        const response = new child_process.ChildProcess();
        //$FlowFixMe
        response.emit = Object.getPrototypeOf(Object.getPrototypeOf(response)).emit;
        //$FlowFixMe
        response.on = Object.getPrototypeOf(Object.getPrototypeOf(response)).on;
        //$FlowFixMe
        response.stdout = new EventEmitter();
        //$FlowFixMe
        response.stderr = new EventEmitter();
        child_process.spawn.mockImplementationOnce((cmd, args, options) => response);
        process.nextTick(() => {
            response.stderr.emit('data', 'oh oh');
            response.stdout.emit('data', 'testing');
            response.emit('close', 0);
        });
        return run('ls', ['-lah'])
        .then(d => {
            expect(d).toEqual({stdout: 'testing', stderr: 'oh oh', code: 0});
            expect(child_process.spawn.mock.calls).toEqual([
                ['ls', ['-lah'], undefined]
            ]);
        });
    });

    test('calls spawn and throws error appropriately', () => {
        const response = new child_process.ChildProcess();
        //$FlowFixMe
        response.emit = Object.getPrototypeOf(Object.getPrototypeOf(response)).emit;
        //$FlowFixMe
        response.on = Object.getPrototypeOf(Object.getPrototypeOf(response)).on;
        //$FlowFixMe
        response.stdout = new EventEmitter();
        //$FlowFixMe
        response.stderr = new EventEmitter();
        child_process.spawn.mockImplementationOnce((cmd, args, options) => response);
        process.nextTick(() => {
            response.stderr.emit('data', 'oh oh');
            response.stdout.emit('data', 'testing');
            response.emit('error', new Error('dang'));
        });
        return run('ls', ['-lah'])
        .catch(e => {
            expect(e).toEqual(new Error('dang'));
            expect(child_process.spawn.mock.calls).toEqual([
                ['ls', ['-lah'], undefined]
            ]);
        });
    });
});

