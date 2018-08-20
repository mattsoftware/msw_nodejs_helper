'use strict';
//@flow
const {promisify} = require('util');
const fs = require('fs');

const read = (path/*:string*/)/*:Promise<string>*/ => {
    return promisify(fs.readFile)(path)
    .then(content => content.toString());
};

module.exports = read;

