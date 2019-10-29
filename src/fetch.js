'use strict';
//@flow strict
const http = require('http');
const https = require('https');

const fetch = (url/*:string*/)/*:Promise<string>*/ => {
    return Promise.resolve(url.match(/^https:/) ? https : http)
    .then(proto => {
        return new Promise((res, rej) => {
            proto.get(url, {headers: {accept: '*/*'}}, response => {
                if (response.statusCode !== 200) {
                    rej(new Error('Status code was ' + response.statusCode));
                }
                let data = '';
                response.on('error', e => rej(new Error(e)));
                response.on('data', chunk => data += chunk);
                response.on('end', () => res(data));
            });
        });
    });
};

module.exports = fetch;

