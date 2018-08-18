'use strict';
//@flow
const {promisify} = require('util');
const fs = require('fs');

const exists = (path/*:string*/) => {
    return promisify(fs.stat)(path)
    .then(s => true)
    .catch(e => false);
};

module.exports = exists;

