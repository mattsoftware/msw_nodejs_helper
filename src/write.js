'use strict';
//@flow strict
const {promisify} = require('util');
const fs = require('fs');
const read = require('./read');

const write = (path/*:string*/, content/*:string*/)/*:Promise<boolean>*/ => {
    return read(path)
    .then(data => content != data)
    .catch(err => true)
    .then(doWrite => doWrite && promisify(fs.writeFile)(path, content).then(v => true));
};

module.exports = write;

