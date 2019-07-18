'use strict';
//@flow

const fetch = require('../fetch');
const http = require('http');
jest.mock('http');
const https = require('https');
jest.mock('https');
const { EventEmitter } = require('events');
const {inherits} = require('util');
inherits(http.ClientRequest, EventEmitter);

afterEach(() => {
    jest.clearAllMocks();
});

describe('fetch tests', () => {
    test('fetches a url and gives back the body', () => {
        const response = new http.ClientRequest();
        //$FlowFixMe
        response.emit = Object.getPrototypeOf(Object.getPrototypeOf(response)).emit;
        //$FlowFixMe
        response.on = Object.getPrototypeOf(Object.getPrototypeOf(response)).on;

        //$FlowFixMe
        http.get = jest.fn((url, cb) => {
            //$FlowFixMe
            response.statusCode = 200;
            //$FlowFixMe
            cb(response);
        });
        process.nextTick(() => {
            response.emit('data', 'hello ');
            response.emit('data', 'there');
            process.nextTick(() => response.emit('end'));
        });
        return fetch('http://www.google.com.au')
        .then(d => {
            expect(d).toEqual('hello there');
        });
    });

    test('should throw an error on non-200 status code', () => {
        const response = new http.ClientRequest();

        //$FlowFixMe
        http.get = jest.fn((url, cb) => {
            //$FlowFixMe
            response.statusCode = 404;
            //$FlowFixMe
            cb(response);
        });
        return fetch('http://www.google.com.au')
        .then(d => {
            expect(true).toEqual(false);
        })
        .catch(e => {
            expect(e).toEqual(new Error('Status code was 404'));
        });
    });

    test('should throw an error if the http client request throws an error event', () => {
        const response = new http.ClientRequest();
        //$FlowFixMe
        response.emit = Object.getPrototypeOf(Object.getPrototypeOf(response)).emit;
        //$FlowFixMe
        response.on = Object.getPrototypeOf(Object.getPrototypeOf(response)).on;

        //$FlowFixMe
        http.get = jest.fn((url, cb) => {
            //$FlowFixMe
            response.statusCode = 200;
            //$FlowFixMe
            cb(response);
        });
        process.nextTick(() => {
            response.emit('error', 'something went wrong');
        });
        return fetch('http://www.google.com.au')
        .then(d => {
            expect(true).toEqual(false);
        })
        .catch(e => {
            expect(e).toEqual(new Error('something went wrong'));
        });
    });

    test('should fetch https', () => {
        const response = new http.ClientRequest();
        //$FlowFixMe
        response.emit = Object.getPrototypeOf(Object.getPrototypeOf(response)).emit;
        //$FlowFixMe
        response.on = Object.getPrototypeOf(Object.getPrototypeOf(response)).on;

        //$FlowFixMe
        https.get = jest.fn((url, cb) => {
            //$FlowFixMe
            response.statusCode = 200;
            //$FlowFixMe
            cb(response);
        });
        process.nextTick(() => {
            response.emit('data', 'hello ');
            response.emit('data', 'there');
            process.nextTick(() => response.emit('end'));
        });
        return fetch('https://www.google.com.au')
        .then(d => {
            expect(d).toEqual('hello there');
        });
    });
});

