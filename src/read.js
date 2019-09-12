'use strict';
//@flow
/*:: type FileReadType = "text"|"binary|"json""*/

const {promisify} = require('util');
const fs = require('fs');

const read = (path/*:string*/, type/*:: :?FileReadType*/)/*:Promise<string>*/ => {
    return promisify(fs.readFile)(path)
    .then(content => {
        switch (type) {
            case 'binary':
                return Buffer.from(content, 'binary');
            case 'json':
                return JSON.parse(content.toString());
            case 'text':
            default:
                return content.toString();
        }
    });
};

module.exports = read;

