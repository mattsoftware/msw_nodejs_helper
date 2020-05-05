'use strict';
//@flow strict
/*:: type FileReadType = "text"|"binary"|"json"|"csv"*/

const {promisify} = require('util');
const fs = require('fs');
const csv_parse = require('csv-parse');

const read = (path/*:string*/, type/*:: :?FileReadType*/)/*:Promise<string>*/ => {
    return promisify(fs.readFile)(path)
    .then(content => {
        switch (type) {
            case 'binary':
                return Buffer.from(content, 'binary');
            case 'json':
                return JSON.parse(content.toString());
            case 'csv':
                return new Promise((res,rej) => {
                    csv_parse(content, {columns:true}, (err, output) => {
                        if (err) {
                            rej(err);
                        } else {
                            res(output);
                        }
                    });
                });
            case 'text':
            default:
                return content.toString();
        }
    });
};

module.exports = read;

