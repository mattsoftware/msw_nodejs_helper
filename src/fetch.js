'use strict';
//@flow
const http = require('http');

const fetch = (url/*:string*/)/*:Promise<string>*/ => {
    return new Promise((res, rej) => {
        http.get(url, response => {
            if (response.statusCode !== 200) {
                rej(new Error('Status code was ' + response.statusCode));
            }
            let data = '';
            response.on('error', e => rej(new Error(e)));
            response.on('data', chunk => data += chunk);
            response.on('end', () => res(data));
        });
    });
};

module.exports = fetch;

