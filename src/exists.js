'use strict';
//@flow strict
const {promisify} = require('util');
const fs = require('fs');

const exists = (path/*:string*/)/*:Promise<boolean>*/ => {
    return promisify(fs.stat)(path)
    .then(s => true)
    .catch(e => false);
};

module.exports = exists;

