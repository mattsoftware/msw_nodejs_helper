'use strict';
//@flow
const {promisify} = require('util');
const fs = require('fs');
const read = require('./read');

const write = (path/*:string*/, content/*:string*/) => {
    return read(path)
    .then(data => content != data)
    .catch(err => true)
    .then(doWrite => doWrite && promisify(fs.writeFile)(path, content));
};

module.exports = write;

