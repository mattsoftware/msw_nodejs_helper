'use strict';
//@flow
/*:: type FileReadType = "text"|"binary"*/

const {promisify} = require('util');
const fs = require('fs');

const read = (path/*:string*/, type/*:: :?FileReadType*/)/*:Promise<string>*/ => {
    return promisify(fs.readFile)(path)
    .then(content => {
        switch (type) {
            case 'binary':
                return Buffer.from(content, 'binary');
            case 'text':
            default:
                return content.toString();
        }
    });
};

module.exports = read;

