'use strict';
//@flow strict
const exists = require('./src/exists');
const fetch = require('./src/fetch');
const read = require('./src/read');
const run = require('./src/run');
const touch = require('./src/touch');
const write = require('./src/write');

module.exports = {
    exists,
    fetch,
    read,
    run,
    touch,
    write,
};

